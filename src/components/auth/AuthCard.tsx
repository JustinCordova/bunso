import React from 'react'

interface AuthCardProps {
  title: string
  children: React.ReactNode
  footerText: string
  footerLinkText: string
  onFooterLinkClick: () => void
}

const AuthCard = ({
  title,
  children,
  footerText,
  footerLinkText,
  onFooterLinkClick,
}: AuthCardProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-dark/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-dark/20">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          {title}
        </h1>

        <div className="space-y-6">{children}</div>

        <div className="mt-8 text-center">
          <span className="text-muted">{footerText} </span>
          <button
            onClick={onFooterLinkClick}
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            {footerLinkText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthCard
