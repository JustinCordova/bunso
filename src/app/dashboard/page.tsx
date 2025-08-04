import { requireAuth } from '@/lib/auth-utils'

export default async function DashboardPage() {
  const session = await requireAuth()

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        <div className="bg-white/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Welcome, {session.user.name || session.user.email}!
          </h2>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">
                User Information
              </h3>
              <div className="text-gray-300 space-y-1">
                <p>
                  <strong>Email:</strong> {session.user.email}
                </p>
                <p>
                  <strong>User ID:</strong> {session.user.id}
                </p>
                {session.user.image && (
                  <div className="flex items-center space-x-2">
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>Profile Image Available</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">
                Authentication Status
              </h3>
              <p className="text-green-400">✓ Authenticated</p>
              <p className="text-gray-300 text-sm mt-1">
                This page is protected and only accessible to authenticated
                users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
