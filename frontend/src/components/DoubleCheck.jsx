import React, { useEffect } from 'react'
import { useRef } from 'react'

const DoubleCheck = ({ isDeleteOption, itemId, handleDelete }) => {

  const cancelRef = useRef(null)
  const deleteRef= useRef(null)

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if(cancelRef.current && !cancelRef.current.contains(e.target) ){
  //       isDeleteOption(false)
  //     }
  //   }

  //   window.addEventListener("mousedown", handleClickOutside)

  //   return () => {
  //     window.removeEventListener("mousedown", handleClickOutside)
  //   }
  // }, [isDeleteOption])

  return (
    <div className="absolute w-screen z-[99] h-screen top-0 left-0">
      <div 
      ref={cancelRef}
      className="absolute flex-col flex items-center text-center justify-around px-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-58 h-60 bg-white rounded-lg shadow-lg">
        <p className='text-sm text-black'>
          Are you sure you want to delete this post?
        </p>
        <div className='text-black flex flex-row gap-2'>
          <button 
          onClick={() => {handleDelete(itemId); isDeleteOption(false)}}
          className='px-2 bg-neutral-800 text-white rounded-lg cursor-pointer'>
            Delete
          </button>
          <button 
          ref={deleteRef}
          onClick={() => isDeleteOption(false)}
          className='px-2 bg-neutral-800 text-white rounded-lg cursor-pointer'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}


export default DoubleCheck