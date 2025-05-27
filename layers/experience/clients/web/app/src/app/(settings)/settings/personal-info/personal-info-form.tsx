'use client'

import { useEffect, useTransition } from 'react'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { client } from '@/app/amplify.config'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().optional(),
})

// Type for the form data
type FormValues = z.infer<typeof formSchema>

// Define the GraphQL mutation
const updateUserMutation = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      email
    }
  }
`

type PersonalInfoFormProps = {
  userData: {
    id: string
    name?: string
    bio?: string | null
  }
}

export default function PersonalInfoForm({ userData }: PersonalInfoFormProps) {
  const [is_pending, startTransition] = useTransition()
  // Setup react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.name || '',
      bio: userData.bio || '',
    },
  })

  // Reset form when userData changes
  useEffect(() => {
    reset({
      name: userData.name || '',
      bio: userData.bio || '',
    })
  }, [userData, reset])

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    // If no changes, don't submit
    if (!isDirty) {
      toast.success('No changes to save')
      return
    }

    startTransition(async () => {
      try {
        // Call the API using Amplify

        await client.graphql({
          query: updateUserMutation,
          variables: {
            input: {
              name: data.name,
              bio: data.bio,
            },
          },
          authMode: 'userPool',
        })

        toast.success('Profile updated successfully')

        // Update the form's state to reflect the saved state
        reset({ ...data }, { keepValues: true })
      } catch (error) {
        console.error('Error updating user:', error)

        toast.error(
          error instanceof Error ? error.message : 'Failed to update profile',
        )
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <div className="space-y-7">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h2>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            {...register('name')}
            className={cn(
              'block w-full rounded-md border py-2 px-3',
              'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500',
              'transition-colors duration-200',
              errors.name ? 'border-red-500' : 'border-gray-300',
            )}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Your full name as it will appear on your profile
          </p>
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            {...register('bio')}
            rows={4}
            className={cn(
              'block w-full rounded-md border border-gray-300 py-2 px-3',
              'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500',
              'transition-colors duration-200',
            )}
            placeholder="Tell us about yourself and your fashion interests..."
          />
          {errors.bio && (
            <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Brief description of your fashion style and interests that will be
            displayed on your profile
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={is_pending || !isDirty}
          className={cn(
            'inline-flex justify-center rounded-md border border-transparent',
            'py-2 px-6 text-sm font-medium shadow-sm',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'transition-colors duration-200',
            is_pending || !isDirty
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
          )}
        >
          {is_pending ? (
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
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  )
}
