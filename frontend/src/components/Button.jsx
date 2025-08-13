import React from 'react'

const Button = ({label, className}) => {
  return (
        <button type='submit' className={`${className} hover:cursor-pointer w-full hover:bg-neutral-300 flex mt items-center justify-center bg-white rounded-lg text-black h-10 text-[15px]`}>{label}</button>
  )
}

export default Button