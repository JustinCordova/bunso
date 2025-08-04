import React from 'react'

interface AuthInputProps {
  label: string
  type: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

const AuthInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}: AuthInputProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-white text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-lg bg-muted/20 border border-muted/30 text-white placeholder-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
      />
    </div>
  )
}

export default AuthInput
