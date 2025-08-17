import React from 'react'

const Skeleton = ({className, children}) => {
  return (
    <div className={`${className} animate-pulse bg-neutral-600`}>
      {children}
    </div>
  )
}

export default Skeleton