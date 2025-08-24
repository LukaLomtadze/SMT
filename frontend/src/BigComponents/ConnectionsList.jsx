import React, { useEffect } from 'react'
import { useConnectionsStore } from '../stateManagment/connections'
import { useAuthStore } from '../stateManagment/authStore'
import { NavLink } from 'react-router-dom'
import { MdVerified } from 'react-icons/md'
import FollowersSkeletons from '../components/FollowersSkeletons'

const ConnectionsList = () => {
    const {isOpen, toggleOpen, windowUpdate, windowOpened} = useConnectionsStore()

    const {followersLoading, getFollowersAndFollowing, followers, following, user} = useAuthStore()

    useEffect(() => {
        getFollowersAndFollowing(user?._id)
    }, [user?._id, getFollowersAndFollowing])

    const connection = windowOpened === "followers" ? followers : following

  return (
    <div className='w-screen h-screen top-0 left-0 absolute bg-transparent flex items-center justify-center'>
        <div 
            onClick={() => {toggleOpen(isOpen); windowUpdate("")}}
            className='w-screen h-screen z-[100] absolute bg-black/60'>
        </div>

        <div className='md:max-w-[40%] w-[85%] h-[90%] bg-neutral-800 rounded-2xl z-[102] ml-10'>
            <div className='w-full px-3 flex flex-row items-center justify-around mt-8 text-2xl text-neutral-200 border-b border-neutral-400 pb-8 transition-all ease-in-out duration-100'>
                <div 
                    className={`${windowOpened === "followers" ? "bg-neutral-700" : ""} cursor-pointer px-5 py-1 rounded-2xl`}
                    onClick={() => windowUpdate("followers")}
                    >
                    Followers</div>
                <div 
                    className={`${windowOpened === "following" ? "bg-neutral-700" : ""} cursor-pointer px-5 py-1 rounded-2xl`}
                    onClick={() => windowUpdate("following")}
                >
                Following</div>
            </div>

            <div>

            {
                followersLoading ? 
                (<FollowersSkeletons />)
                :
                (
                    connection.map((item, i) => {
                        return(
                            <div key={i}>
                                <div className='flex flex-row items-center border-b border-neutral-400 w-[90%] py-3 text-white ml-5 gap-2 mt-5'>
                                    <NavLink 
                                        to={`/account/${item?._id}`} 
                                        onClick={() => {toggleOpen(isOpen)}}>
                                        <img 
                                            src={item.image} 
                                            className='w-8 h-8 rounded-full cursor-pointer' />
                                    </NavLink>
                                    <NavLink 
                                        onClick={() => {toggleOpen(isOpen)}}
                                        to={`/account/${item?._id}`}>
                                            <div className='flex flex-row gap-1 items-center hover:underline'>
                                                {item?.name}
                                                {item?.isAdmin || item?.hasBadge? <MdVerified className='text-sky-400' /> : <></>}
                                            </div>
                                    </NavLink>  
                                </div>
                            </div>
                        )
                    })
                )
            }

            </div>
        </div>
    </div>
  )
}

export default ConnectionsList