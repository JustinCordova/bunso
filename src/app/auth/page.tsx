'use client'

import React, { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BrandSection from '@/components/auth/BrandSection'
import AuthCard from '@/components/auth/AuthCard'
import AuthInput from '@/components/auth/AuthInput'
import AuthButton from '@/components/auth/AuthButton'

type AuthMode = 'login' | 'register'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<AuthMode>('login')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  })

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (mode === 'login') {
        // For login, use email or username as email
        const email = formData.username.includes('@')
          ? formData.username
          : formData.email
        const result = await signIn('credentials', {
          email,
          password: formData.password,
          redirect: false,
        })

        if (result?.error) {
          setError('Invalid email or password')
        } else {
          router.push('/')
        }
      } else {
        // For registration, create the user first
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || 'Registration failed')
          return
        }

        // After successful registration, sign in
        const signInResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (signInResult?.error) {
          setError('Registration successful but sign-in failed')
        } else {
          router.push('/')
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('google', { redirect: false })
      if (result?.error) {
        setError('Google sign-in failed')
      }
    } catch (error) {
      setError('An error occurred with Google sign-in')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    // Clear form data when switching modes
    setFormData({
      fullName: '',
      username: '',
      email: '',
      password: '',
    })
  }

  const isLogin = mode === 'login'

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Brand */}
      <BrandSection />

      {/* Right Section - Auth Form */}
      <div className="flex-1 bg-gradient-to-br from-primary/30 via-accent/40 to-secondary/50 flex items-center justify-center p-8">
        <AuthCard
          title={isLogin ? 'Sign In' : 'Register'}
          footerText={
            isLogin ? "Don't have an account?" : 'Already have an account?'
          }
          footerLinkText={isLogin ? 'Register' : 'Sign In'}
          onFooterLinkClick={toggleMode}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <AuthInput
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
                required
              />
            )}

            <AuthInput
              label={isLogin ? 'Username or Email' : 'Username'}
              type="text"
              placeholder={
                isLogin ? 'Enter your username or email' : 'Choose a username'
              }
              value={formData.username}
              onChange={handleInputChange('username')}
              required
            />

            {!isLogin && (
              <AuthInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
              />
            )}

            <AuthInput
              label="Password"
              type="password"
              placeholder={
                isLogin ? 'Enter your password' : 'Create a password'
              }
              value={formData.password}
              onChange={handleInputChange('password')}
              required
            />

            <AuthButton type="submit" disabled={isLoading}>
              {isLoading ? 'Signing In...' : isLogin ? 'Sign In' : 'Register'}
            </AuthButton>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            {/* Only show Google sign-in if Google OAuth is configured */}
            {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <AuthButton
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="bg-white text-gray-900 hover:bg-gray-50"
                >
                  {isLoading ? 'Signing In...' : 'Continue with Google'}
                </AuthButton>
              </>
            )}
          </form>
        </AuthCard>
      </div>
    </div>
  )
}
