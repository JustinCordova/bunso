import React from 'react'

interface AuthButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

const AuthButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
}: AuthButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted/50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-dark"
    >
      {children}
    </button>
  )
}

export default AuthButton
