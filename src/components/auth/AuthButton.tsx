import React from 'react'

interface AuthButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

const AuthButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className,
}: AuthButtonProps) => {
  const baseClasses =
    'w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-dark'
  const defaultClasses =
    'bg-primary hover:bg-primary/90 disabled:bg-muted/50 disabled:cursor-not-allowed text-white'
  const buttonClasses = className || defaultClasses

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${buttonClasses}`}
    >
      {children}
    </button>
  )
}

export default AuthButton
