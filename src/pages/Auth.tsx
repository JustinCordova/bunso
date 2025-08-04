'use client'

import React, { useState } from 'react'
import BrandSection from '../components/auth/BrandSection'
import AuthCard from '../components/auth/AuthCard'
import AuthInput from '../components/auth/AuthInput'
import AuthButton from '../components/auth/AuthButton'

type AuthMode = 'login' | 'register'

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('login')
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'login') {
      console.log('Login attempt:', {
        username: formData.username,
        password: formData.password,
      })
    } else {
      console.log('Register attempt:', formData)
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
      <div className="flex-1 bg-gradient-to-b from-secondary/20 to-primary/20 flex items-center justify-center p-8">
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

            <AuthButton type="submit">
              {isLogin ? 'Sign In' : 'Register'}
            </AuthButton>
          </form>
        </AuthCard>
      </div>
    </div>
  )
}

export default Auth
