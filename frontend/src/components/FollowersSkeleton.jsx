import React from 'react'
import Skeleton from './Skeleton'

const FollowersSkeleton = () => {
  return (
    <div className='w-[90%] gap-3 flex flex-col pl-5'>
        <div className='mt-3 flex flex-row items-center gap-2 '>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-5 rounded-2xl"} />
        </div>
        <div className='flex flex-row items-center gap-2 '>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-5 rounded-2xl"} />
        </div>
        <div className='flex flex-row items-center gap-2 '>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-5 rounded-2xl"} />
        </div>
        <div className='flex flex-row items-center gap-2 '>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-5 rounded-2xl"} />
        </div>
        <div className='flex flex-row items-center gap-2 '>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-5 rounded-2xl"} />
        </div>
        <div className='flex flex-row items-center gap-2 '>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-5 rounded-2xl"} />
        </div>
        <div className='flex flex-row items-center gap-2 '>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-5 rounded-2xl"} />
        </div>
        <div className='flex flex-row items-center gap-2 '>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-5 rounded-2xl"} />
        </div>
        <div className='flex flex-row items-center gap-2 '>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-5 rounded-2xl"} />
        </div>
        <div className='flex flex-row items-center gap-2 '>
            <Skeleton className={"w-8 h-8 rounded-full"} />
            <Skeleton className={"w-32 h-5 rounded-2xl"} />
        </div>
    </div>
  )
}

export default FollowersSkeleton