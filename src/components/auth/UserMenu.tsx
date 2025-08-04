'use client'

import { useAuth } from '@/hooks/useAuth'

export default function UserMenu() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <a
          href="/auth"
          className="text-white hover:text-gray-300 transition-colors"
        >
          Sign In
        </a>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {user?.image && (
          <img
            src={user.image}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="text-white text-sm">{user?.name || user?.email}</span>
      </div>

      <button
        onClick={logout}
        className="text-white hover:text-gray-300 transition-colors text-sm"
      >
        Sign Out
      </button>
    </div>
  )
}
