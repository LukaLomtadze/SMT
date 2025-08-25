import React, { useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { GoBookmarkFill } from "react-icons/go";
import { GoBookmark } from "react-icons/go";
import { FaTrash } from "react-icons/fa6";
import { GoComment } from "react-icons/go";
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { useCommentStore } from '../stateManagment/commentStore';
import Comments from '../components/Comments';
import { usePostStore } from '../stateManagment/postStore';

const ProfilePosts = ({id, image, name, content, authorId, commentCount, isAdmin, hasBadge, contentImage, i, createdAt, isLiked, isBookMarked, likesCount, bookmarkCount}) => {


  const calculateUploadDate = (date) => {
    const dateNow = Date.now()
    const diff = dateNow - new Date(date).getTime()

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if(seconds < 60) return `${seconds}s`
    if(minutes < 60) return `${minutes}m`
    if(hours < 24) return `${hours}h`
    return `${days}d`
  }

  const {isOpen, toggleOpen, getComments} = useCommentStore()
  const [postId, setPostId] = useState(null)

  const {toggleLike, toggleBookmark} = usePostStore()


  return (
    <div key={id} className={`p-5 border-1 ${i == 0 ? "mt-15" : ""} mb-10 rounded-2xl w-[65%] text-white border-neutral-500`}>
        <div className=''>
            <div className=''>
                <div className='flex flex-row items-center gap-2'>
                    <img src={image} className='w-8 h-8 rounded-full' />
                    <div className='flex flex-row items-center gap-1 text-white'>
                        <p>{name}</p>
                        {isAdmin || hasBadge ? <MdVerified className='text-sky-400' /> : <></>}
                    </div>
                    <div className='text-neutral-400 text-sm'>• {calculateUploadDate(createdAt)}</div>
                </div>

                <div className='flex flex-col text-white'>
                    <div className=' mx-0 mt-5 md:mt-5 w-full'>
                      <p className='break-all mt-3'>{content}</p>
                    </div>
                    <div className='w-full flex items-center justify-center mt-5'>
                      <img src={contentImage} className='md:w-[50%] w-full h-auto object-cover rounded-lg cursor-pointer' />
                    </div>
                </div>

                <div className='w-full flex justify-center mt-5 gap-20 text-lg'>
                  <div 
                    className='cursor-pointer md:text-lg flex gap-1 hover:text-blue-400 flex-row items-center justify-center  rounded-full  text-sm'
                    onClick={() => {
                      setPostId(id)
                      toggleOpen(isOpen)
                      getComments(id)
                    }}
                  >

                    <div className='hover:bg-sky-900 flex items-center justify-center hover:text-blue-400 p-1 rounded-full'>
                      <GoComment />
                    </div>

                    <div className='text-sm'>
                      {commentCount}
                    </div>

                  </div>
                  <div className='cursor-pointer  flex flex-row items-center justify-center  rounded-full p-1 gap-1  md:text-lg text-sm hover:text-pink-400'
                     onClick={() => {toggleLike(id)}}
                  >
                  <div className='hover:bg-fuchsia-900 rounded-full p-1'>
                    {isLiked ? (<IoIosHeart className='text-pink-500 shadow-2xl'/>) : (<IoIosHeartEmpty />)}
                  </div>
                  <p className='text-sm'>
                    {likesCount}
                  </p>
                  </div>
                  <div className='cursor-pointer  flex flex-row items-center justify-center hover:text-amber-400 gap-1 rounded-full p-1  md:text-lg text-sm'
                  onClick={() => {toggleBookmark(id)}}
                  >
                    <div className='hover:bg-amber-900 p-1 rounded-full'>
                    {isBookMarked ? (<GoBookmarkFill className='text-amber-400' />) : (<GoBookmark />)}
                    </div>
                    <p className='text-sm'>
                      {bookmarkCount}
                    </p>
                  </div>
                </div>
            </div>
            <Comments postId={postId} />
        </div>
    </div>
  )
}

export default ProfilePosts