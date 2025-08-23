import React from 'react'
import Skeleton from './Skeleton'

const CommentsSkeleton = () => {
  return (
    <div className='flex flex-col gap-3 ml-3 mt-3'>
        <div className='flex flex-row gap-2 items-center'>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-12 rounded-2xl"} />
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-40 h-12 rounded-2xl"} />
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-12 rounded-2xl"} />
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-60 h-12 rounded-2xl"} />
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-72 h-12 rounded-2xl"} />
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-56 h-12 rounded-2xl"} />
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-68 h-12 rounded-2xl"} />
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-12 rounded-2xl"} />
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-58 h-12 rounded-2xl"} />
        </div>
    </div>
  )
}

export default CommentsSkeleton