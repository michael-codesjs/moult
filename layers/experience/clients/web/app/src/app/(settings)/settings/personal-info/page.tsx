import PersonalInfoForm from './personal-info-form'
import SignatureForm from './signature-form'
import { cookies } from 'next/headers'
import { getAuthenticatedCognitoUser } from '@/utils/amplify-server-utils'
import { prisma } from '@/lib/prisma'
import { cn } from '@/lib/utils'

export default async function PersonalInfoPage() {
  const cognito_user = await getAuthenticatedCognitoUser({ cookies })
  const user_data = (await prisma.user.findUnique({
    where: {
      id: cognito_user!.userId!,
    },
  }))!

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600">
          Manage your profile information and how others see you on the platform
        </p>
      </div>

      {/* Main content wrapper with subtle gradient background */}
      <div
        className={cn(
          'bg-gradient-to-br from-white to-purple-50/30 rounded-xl shadow-sm overflow-hidden',
          'border border-purple-100/50',
        )}
      >
        {/* User avatar section */}
        <div className="p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="relative mb-6 md:mb-0 md:mr-8">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center shadow-md">
                {user_data.name ? (
                  <span className="text-4xl font-bold text-purple-700">
                    {user_data.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </div>

              {/* Camera icon overlay */}
              <button className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center shadow-md hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Profile Photo
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                A high-quality photo helps people recognize you
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className={cn(
                    'inline-flex items-center px-4 py-2 rounded-md text-sm font-medium',
                    'border border-purple-600 text-purple-600 bg-white',
                    'hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
                    'transition-colors duration-200',
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Upload Photo
                </button>
                <button
                  type="button"
                  className={cn(
                    'inline-flex items-center px-4 py-2 rounded-md text-sm font-medium',
                    'border border-gray-300 text-gray-700 bg-white',
                    'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
                    'transition-colors duration-200',
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Forms container */}
        <div className="bg-white rounded-b-xl">
          {/* Personal info form */}
          <PersonalInfoForm userData={user_data} />

          {/* Signature form - separate section */}
          <SignatureForm userData={user_data} />
        </div>
      </div>
    </div>
  )
}
