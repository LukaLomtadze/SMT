import React, { useState } from 'react'
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";

const Input = ({icon:Icon, name,isPassword, ...props}) => {

  const [shown, setShown] = useState(false)
  return (
    <div className='relative mb-3 w-full'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Icon className="size-5 text-neutral-600 " />
        </div>
        <input {...props} className={`
            w-full pl-10 ${isPassword ? 'pr-10' : 'pr-3'} py-2 
          bg-neutral-900 rounded-lg border border-gray-700 
          focus:border-teal-400 focus:ring-1 focus:ring-teal-300 
            text-[14px] text-white placeholder-gray-400 
            transition-colors duration-200
          `}
            type={
              isPassword ? (shown ? "text" : "password") : props.type || "text"
            }
            name={name}
          />
        {
          isPassword && (
            <>
              <div className='absolute inset-y-0 right-4 flex items-center pl-3'>
                {
                  shown ? <IoEyeOffSharp onClick={() => setShown(false)} className='size-5 cursor-pointer text-neutral-600' /> : 
                  <MdRemoveRedEye onClick={() => setShown(true)} className='size-5 cursor-pointer text-neutral-600' />
                }
              </div>
            </>
          )
        }
    </div>
  )
}

export default Input