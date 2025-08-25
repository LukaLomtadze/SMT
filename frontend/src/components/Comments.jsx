import React, { useRef, useState } from 'react'
import { useCommentStore } from '../stateManagment/commentStore'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useAuthStore } from '../stateManagment/authStore';
import { IoSendSharp } from "react-icons/io5";
import { MdVerified } from 'react-icons/md';
import Skeleton from './Skeleton';
import CommentsSkeleton from './CommentsSkeleton';
import { NavLink } from 'react-router-dom';

const Comments = ({postId}) => {

    const {isOpen, toggleOpen, isLoading, comments, createComment} = useCommentStore()

    const {user} = useAuthStore()

    const [content, setContent] = useState("")

    const handleCommentUpload = async(e) => {
        e.preventDefault()
        if(!content.trim()) return;
        setContent("");
        await createComment(postId, content)
    }

    const lastCommentRef = useRef(null)

    // useEffect(() => {
    //     lastCommentRef.current?.scrollIntoView({behaviour: "smooth"})
    // }, [comments])

    const calculateUploadDate = (date) => {
        const dateNow = Date.now()
        const diff = dateNow - new Date(date).getTime();
    
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if(seconds < 60) return `${seconds}s`
        if(minutes < 60) return `${minutes}m`
        if(hours < 24) return `${hours}h`
        return `${days}d`
    }
  return (
    <>
    {isOpen ? 
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-screen h-screen z-[9999] absolute top-0 right-0 bg-black opacity-30'
            onClick={() => {toggleOpen(isOpen); setContent("")}}
            ></div>


            <div className='md:w-[60vw] z-[9999] absolute top-1/2 md:left-[57%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center py-4 md:h-[80vh] h-[65vh] w-[98vw] bg-neutral-800
            rounded-lg 
            '

            
            >
                <IoMdCloseCircleOutline className='absolute text-neutral-300 top-3 md:text-3xl right-4 text-lg cursor-pointer'
                onClick={() => {toggleOpen(isOpen); setContent("")}}
                />
                <div className='w-full flex flex-col items-center gap-4'>
                    <p className='text-2xl'>Comments</p>
                    <div className='w-full h-[1px] bg-neutral-400'></div>
                </div>
                <div className='h-[80%] w-full overflow-y-auto'>
                    
                    {isLoading ?
                        <CommentsSkeleton /> :
                        (
                            comments.length == 0 ? (<div className='w-full flex items-center justify-center h-full flex-col gap-2'>
                                <p className='text-2xl'>No Comments</p>
                                <p className='text-lg'>Be first to comment</p>
                            </div>):
                            (
                                comments.map((item, i) => {
                                    return(
                                        <div className='flex flex-col'>
                                        <div 
                                            className={`flex flex-row items-center gap-2 ml-2`}
                                            key={item?._id || i}
                                            ref={lastCommentRef}
                                        >

                                            <div>
                                                <NavLink className={"cursor-pointer"} to={`/account/${item?.author?._id}`}><img src={item?.author?.image} className='w-8 h-8 rounded-full' /></NavLink>
                                            </div>
                                            <div className='flex flex-col max-w-[80%] gap-2 bg-neutral-700 px-3 py-1 mt-3 rounded-2xl'>
                                                <p className='flex flex-row items-center gap-1'>{item?.author?.name}
                                                    {
                                                        item?.author?.hasBadge || item?.author?.isAdmin ? 
                                                        (<MdVerified className='text-sky-400' />) : (<></>)
                                                    }
                                                </p>
                                                <p className='break-all'>{item?.content}</p>
                                                
                                            </div>
                                            
                                        </div>
                                            <div className={`ml-13  ${i == comments.length - 1 ? "mb-5" : ""}`}>
                                                <p className='text-neutral-500'>{calculateUploadDate(item?.createdAt)}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        )
                    }
                </div>
                <div className='w-full flex flex-col'>
                    <div className='w-full h-[1px] bg-neutral-300'></div>
                    <form 
                    className='w-full pt-3 px-2 md:px-5 justify-center  flex flex-row'
                    onSubmit={handleCommentUpload}
                    >
                        <img src={user?.image} className='md:w-12 md:h-12 rounded-full md:mt-0 mt-1 w-8 h-8' />
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type='text' 
                            value={content}
                            placeholder={`Comment as ${user?.name}`}
                            className='md:w-[85%] text-[10px] md:text-[16px] w-[70%] placeholder:text-[10px] border md:placeholder:text-[14px] rounded-2xl md:px-3 px-1 border-neutral-400 outline-0 ml-1'
                        />
                        <button 

                        type='submit' 
                        disabled={isLoading}
                        className='md:ml-2 hover:bg-neutral-600 h-[50%] flex items-center justify-center text-center rounded-2xl mt-3 md:mt-3 md:text-2xl p-2 cursor-pointer'>
                            <IoSendSharp />
                        </button>
                    </form>
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