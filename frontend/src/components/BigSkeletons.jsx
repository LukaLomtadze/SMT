import React from 'react'
import Skeleton from './Skeleton'

const BigSkeletons = () => {
  return (
    <>
    <div className='flex flex-col gap-2 p-10 mt-10'>
                  <div className='flex flex-row md:gap-2 gap-1'>
                    <Skeleton className={"md:w-10 md:h-10 w-8 h-8 rounded-full"} />
                    <div className='flex flex-col gap-2'>
                      <Skeleton className={"md:w-40 h-4 w-12 rounded-xl"} />
                      <Skeleton className={"md:w-30 w-8 h-3 rounded-xl"} />
                    </div>
                  </div>
                  <Skeleton className={"w-full h-60 rounded-2xl"} />
                </div>
                <div className='flex flex-col gap-2 p-10'>
                  <div className='flex flex-row md:gap-2 gap-1'>
                    <Skeleton className={"md:w-10 md:h-10 w-8 h-8 rounded-full"} />
                    <div className='flex flex-col gap-2'>
                      <Skeleton className={"md:w-40 h-4 w-12 rounded-xl"} />
                      <Skeleton className={"md:w-30 w-8 h-3 rounded-xl"} />
                    </div>
                  </div>
                  <Skeleton className={"w-full h-60 rounded-2xl"} />
                </div>
    </>
  )
}

export default BigSkeletons