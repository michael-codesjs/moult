'use client'

import { useEffect, useTransition, useState } from 'react'
import { cn } from '@/lib/utils'
import { client } from '@/app/amplify.config'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useQuery, useMutation } from '@tanstack/react-query'

// Define GraphQL operations
const checkSignatureAvailabilityQuery = /* GraphQL */ `
  query CheckSignatureAvailability($signature: String!) {
    checkSignatureAvailability(signature: $signature)
  }
`

const updateUserSignatureMutation = /* GraphQL */ `
  mutation UpdateUserSignature($signature: String!) {
    updateUserSignature(signature: $signature) {
      id
      username
    }
  }
`

// Define form schema using Zod
const formSchema = z.object({
  signature: z
    .string()
    .min(3, 'Signature must be at least 3 characters')
    .max(30, 'Signature must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed'),
})

// Type for the form data
type FormValues = z.infer<typeof formSchema>

type SignatureFormProps = {
  userData: {
    id?: string
    signature?: string
  }
}

// Function to check signature availability
const checkSignatureAvailability = async (signature: string) => {
  if (!signature || signature.length < 3) {
    return false
  }

  const response = await client.graphql({
    query: checkSignatureAvailabilityQuery,
    variables: {
      signature,
    },
    authMode: 'userPool',
  })

  // Use type assertion to access data
  const result = response as {
    data: { checkSignatureAvailability: boolean }
  }

  return result.data.checkSignatureAvailability
}

export default function SignatureForm({ userData }: SignatureFormProps) {
  const [is_pending, startTransition] = useTransition()
  const [debouncedSignature, setDebouncedSignature] = useState<string>('')

  // Setup react-hook-form
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      signature: userData.signature || '',
    },
    mode: 'onChange',
  })

  const signature_value = watch('signature')

  // Debounce signature value for availability check - with shorter 200ms delay
  useEffect(() => {
    if (
      signature_value &&
      signature_value.length >= 3 &&
      signature_value !== userData.signature
    ) {
      const timer = setTimeout(() => {
        setDebouncedSignature(signature_value)
      }, 200) // Reduced to 200ms for quicker feedback

      return () => clearTimeout(timer)
    } else {
      setDebouncedSignature('')
    }
  }, [signature_value, userData.signature])

  // Query for signature availability
  const {
    data: isAvailable,
    isLoading: isCheckingAvailability,
    isError,
  } = useQuery({
    queryKey: ['signatureAvailability', debouncedSignature],
    queryFn: () => checkSignatureAvailability(debouncedSignature),
    enabled:
      !!debouncedSignature &&
      debouncedSignature.length >= 3 &&
      debouncedSignature !== userData.signature,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: true,
    retry: false,
  })

  // Set form errors based on availability check
  useEffect(() => {
    if (
      debouncedSignature &&
      debouncedSignature.length >= 3 &&
      debouncedSignature !== userData.signature
    ) {
      if (isAvailable === false) {
        setError('signature', {
          type: 'manual',
          message: 'This signature is already taken',
        })
      } else if (isAvailable === true) {
        clearErrors('signature')
      }

      if (isError) {
        setError('signature', {
          type: 'manual',
          message: 'Error checking availability',
        })
      }
    }
  }, [
    isAvailable,
    isError,
    debouncedSignature,
    userData.signature,
    setError,
    clearErrors,
  ])

  // Update signature mutation
  const mutation = useMutation({
    mutationFn: async (signature: string) => {
      const response = await client.graphql({
        query: updateUserSignatureMutation,
        variables: {
          signature,
        },
        authMode: 'userPool',
      })
      return response
    },
    onSuccess: () => {
      toast.success('Signature updated successfully')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update signature',
      )
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    // If no changes, don't submit
    if (!isDirty || data.signature === userData.signature) {
      toast.success('No changes to save')
      return
    }

    // Submit the mutation
    mutation.mutate(data.signature)

    // Update the form's default value to reflect the new signature
    setValue('signature', data.signature, { shouldDirty: false })
  }

  // Fix the type issue by ensuring isSubmitDisabled is always a boolean
  const isSubmitDisabled: boolean = Boolean(
    !isValid ||
      !!errors.signature ||
      mutation.isPending ||
      !isDirty ||
      signature_value === userData.signature ||
      (debouncedSignature &&
        debouncedSignature.length >= 3 &&
        isCheckingAvailability) ||
      (debouncedSignature &&
        debouncedSignature.length >= 3 &&
        isAvailable === false),
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-t border-gray-100 pt-6 mt-6 p-6"
    >
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Your Signature
          </h2>
          <p className="text-sm text-gray-600 mb-5">
            Your signature is your unique identifier on Moult. It's used in your
            profile URL and mentions.
          </p>
        </div>

        <div>
          <label
            htmlFor="signature"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Signature
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span
              className={cn(
                'inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm',
              )}
            >
              @
            </span>
            <input
              type="text"
              id="signature"
              {...register('signature')}
              className={cn(
                'block w-full flex-1 rounded-none rounded-r-md border py-2 px-3',
                'transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-0',
                isCheckingAvailability && debouncedSignature
                  ? 'border-gray-300 focus:border-gray-300 focus:ring-gray-300'
                  : errors.signature
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : isValid &&
                        signature_value &&
                        signature_value.length >= 3 &&
                        isAvailable
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500',
              )}
            />
          </div>

          <div className="mt-2 flex items-center h-5">
            {isCheckingAvailability &&
              debouncedSignature &&
              debouncedSignature.length >= 3 && (
                <p className="text-xs text-gray-500 flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-3 w-3 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Checking availability...
                </p>
              )}

            {errors.signature && (
              <p className="text-xs text-red-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.signature.message}
              </p>
            )}

            {isValid &&
              signature_value &&
              signature_value.length >= 3 &&
              !errors.signature &&
              isAvailable && (
                <p className="text-xs text-green-600 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  This signature is available
                </p>
              )}
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Your signature must be unique, between 3-30 characters, and can
            contain letters, numbers, and underscores.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={cn(
            'inline-flex justify-center rounded-md border border-transparent',
            'py-2 px-6 text-sm font-medium shadow-sm',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'transition-colors duration-200',
            isSubmitDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
          )}
        >
          {mutation.isPending ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating...
            </>
          ) : (
            'Update Signature'
          )}
        </button>
      </div>
    </form>
  )
}
