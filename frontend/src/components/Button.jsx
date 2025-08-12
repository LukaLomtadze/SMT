import React from 'react'

const Button = ({label}) => {
  return (
        <button type='submit' className={`hover:cursor-pointer w-full hover:bg-teal-500 flex mt-3 items-center justify-center bg-sky-400 rounded-lg h-10 text-[15px]`}>{label}</button>
  )
}

export default Button