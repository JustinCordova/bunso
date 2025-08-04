import React from 'react'

const NoPosts = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-muted text-lg font-medium">No posts found.</div>
      <p className="text-muted/70 text-sm mt-2 max-w-md">
        Start creating content or follow others to see posts here.
      </p>
    </div>
  )
}

export default NoPosts
