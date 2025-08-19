import React from 'react'
import { useCommentStore } from '../stateManagment/commentStore'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useAuthStore } from '../stateManagment/authStore';
import { IoSendSharp } from "react-icons/io5";

const Comments = () => {

    const {isOpen, toggleOpen} = useCommentStore()

    const {user} = useAuthStore()


  return (
    <>
    {isOpen ? 
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-screen h-screen z-[9999] absolute top-0 right-0 bg-black opacity-60'
            onClick={() => toggleOpen(isOpen)}
            ></div>


            <div className='md:w-[60vw] z-[9999] absolute top-1/2 md:left-[57%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center py-4 md:h-[80vh] h-[65vh] w-[98vw] bg-neutral-800
            rounded-lg justify-between
            '

            
            >
                <IoMdCloseCircleOutline className='absolute text-neutral-300 top-3 md:text-3xl right-4 text-lg cursor-pointer'
                onClick={() => toggleOpen(isOpen)}
                />
                <div className='w-full flex flex-col items-center gap-4'>
                    <p className='text-2xl'>Comments</p>
                    <div className='w-full h-[1px] bg-neutral-400'></div>
                </div>

                <div className='w-full flex flex-col'>
                    <div className='w-full h-[1px] bg-neutral-300'></div>
                    <div className='w-full pt-3 px-2 md:px-5 justify-center  flex flex-row'>
                        <img src={user?.image} className='md:w-12 md:h-12 rounded-full md:mt-0 mt-1 w-8 h-8' />
                        <input type='text' placeholder={`Comment as ${user?.name}`}
                            className='md:w-[85%] text-[10px] md:text-[16px] w-[70%] placeholder:text-[10px] border md:placeholder:text-[14px] rounded-2xl md:px-3 px-1 border-neutral-400 outline-0 ml-1'
                        />
                        <button className='md:ml-2 hover:bg-neutral-600 h-[50%] flex items-center justify-center text-center rounded-2xl mt-3 md:mt-3 md:text-2xl p-2 cursor-pointer'>
                            <IoSendSharp />
                        </button>
                    </div>
                </div>
            </div>
        </div> 
        :
        <>

        </>
    }
    </>
  )
}

export default Comments