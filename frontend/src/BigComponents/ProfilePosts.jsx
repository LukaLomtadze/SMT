import React from 'react'
import { MdVerified } from 'react-icons/md'

const ProfilePosts = ({id, image, name, content, authorId, isAdmin, hasBadge, contentImage, i, posts}) => {
  return (
    <div key={id} className={`p-5 border-1 mb-10 ${i == 0 ? "mt-15" : ""} rounded-2xl ${i == posts.length - 1 ? "mb-10" : ""} w-[90%]  text-white border-neutral-500`}>
        <div className=''>
            <div>
                <div className='flex flex-row items-center gap-2'>
                    <img src={image} className='w-8 h-8 rounded-full' />
                    <div className='flex flex-row items-center gap-1 text-white'>
                        <p>{name}</p>
                        {isAdmin || hasBadge ? <MdVerified className='text-sky-400' /> : <></>}
                    </div>
                </div>

                <div className='flex flex-col text-white'>
                    <div className=' mx-0 mt-5 md:mt-5 w-full'>
                      <p className='break-all'>{content}</p>
                    </div>
                    <img src={contentImage} className='md:w-[50%] w-full h-auto object-cover rounded-lg cursor-pointer' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfilePosts