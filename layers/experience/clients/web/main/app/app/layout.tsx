'use server'
import { MinimalBanner } from '@/components/ui/minimal-banner'
import { AppNavigation } from '@/components/app/navigation'
import { getAuthenticatedUser } from '@/utils/amplify-server-utils'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthenticatedUser()

  return (
    <div className="relative min-h-screen bg-gray-50">
      <MinimalBanner />
      <AppNavigation user={user} />

      {/* Main Content */}
      <div className="lg:pl-64 pb-20 lg:pb-0">
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}
