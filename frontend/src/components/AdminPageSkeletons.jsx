import React from 'react'
import Skeleton from './Skeleton'

const AdminPageSkeletons = () => {
  return (
    <div className='flex flex-col gap-3 ml-3 mb-3'>
        <p className='text-lg text-white'>Fetching Users</p>
        {Array.from({length: 10}).map((_, i) => (
            <div key={i} className='w-full flex flex-row items-center md:gap-3 gap-1 mt-5'>
                <Skeleton className={"rounded-full md:w-8 md:h-8 w-6 h-6"} />
                <Skeleton className={"rounded-2xl w-[96%] md:h-8 h-6"} />
            </div>)
        )}

        <div className='my-3 flex flex-row gap-3 items-center'>
          <Skeleton className={"w-8 h-8 rounded-sm"}/>
          <Skeleton className={"w-8 h-8 rounded-sm"}/>
          <Skeleton className={"w-8 h-8 rounded-sm"}/>
          <Skeleton className={"w-8 h-8 rounded-sm"}/>
          <Skeleton className={"w-8 h-8 rounded-sm"}/>
          <Skeleton className={"w-8 h-8 rounded-sm"}/>
          <Skeleton className={"w-8 h-8 rounded-sm"}/>
        </div>
    </div>
  )
}

export default AdminPageSkeletons