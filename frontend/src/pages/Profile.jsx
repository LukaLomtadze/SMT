import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa6";
import { BsFillCollectionFill } from "react-icons/bs";
import { useAuthStore } from '../stateManagment/authStore';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import { MdVerified } from "react-icons/md";
import FollowButton from '../components/FollowButton';
import { BiRepost } from "react-icons/bi";
import { useProfileRouterStore } from '../stateManagment/profileRouter';
import ProfileStatePage from './ProfileStatePage';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Skeleton from '../components/Skeleton';
import { GoBookmarkFill } from "react-icons/go";
import ConnectionsList from '../BigComponents/ConnectionsList';
import { useConnectionsStore } from '../stateManagment/connections';

const Profile = ({open}) => {


    const API_URL = "http://localhost:4040/api/auth";

    const items = [
        {label: "Posts", icon: <BsFillCollectionFill />},
        {label: "Liked", icon: <FaHeart />},
        {label: "Marked", icon: <GoBookmarkFill />}
    ]

    const {id, id: personalId} = useParams()

    const {user} = useAuthStore()

    const [profileData, setProfileData] = useState(null)

    const isOwner = user?._id === personalId;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/${id}`, { withCredentials: true });
                setProfileData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchProfile();
    }, [id]);

    const {updateProfileState, initialState} = useProfileRouterStore()

    const isSmall = window.innerWidth <= 768;

    const {isOpen, toggleOpen, windowUpdate} = useConnectionsStore()

    
    

  return (
    <div className={`${open ? "ml-[270px] py-5 px-0" : "md:ml-[80px] ml-5"} h-screen transition-all ease-in-out duration-100 `}>
        <div className={`w-full h-full ${!open ? "-mt-8 " : ""}`}>
            <div className='mt-10 md:ml-4 ml-0 flex flex-col items-center mb-3 md:flex-row gap-5'>
                <div>
                {profileData?.image ? (
                    <img 
                      src={profileData.image} 
                      alt="profile" 
                      className="md:w-32 md:h-32 mt-5 md:mt-0 w-20 h-20 object-cover rounded-full" 
                    />
                    ) : (
                      <Skeleton className="md:w-32 md:h-32 mt-5 md:mt-0 w-20 h-20 rounded-full" />
                    )
                }

                </div>
                <div className='flex-col flex h-12 md:h-32 justify-between'>
                <div className='text-white mt-2 w-full flex flex-col'>
                    <div 
                      className='flex flex-row items-center justify-center md:justify-normal w-full pl-1 md:pl-0'>
                        <div 
                          className='md:text-xl text-lg flex items-center md:items-center text-center'>
                            {profileData?.name || <Skeleton className={"w-30 h-4 rounded-2xl"} />}
                        </div>
                    {profileData?.isAdmin || profileData?.hasBadge ? <MdVerified className='text-sky-400' /> : <></>}
                    </div>
                    <div 
                      className='text-sm text-neutral-400 text-center flex justify-center md:justify-normal'>
                      {isOwner ? profileData?.email || 
                      <Skeleton className={"rounded-2xl mt-1 md:w-50 w-30 h-4 mb-2"} /> 
                        : 
                      <></>}
                    </div>
                    <div 
                        className='text-white flex flex-row md:gap-4 gap-2 mt-2 justify-center'>
                        <p className='text-sm md:text-lg flex flex-row items-center gap-1'>
                          <span 
                            onClick={() => {if(isOwner){toggleOpen(isOpen); windowUpdate("followers")}}}
                            className={`${isOwner ? "hover:underline cursor-pointer" : ""}`}>
                              {profileData?.followersCount || 0}
                              </span> 
                              <span 
                                className={`${isOwner ? "hover:underline cursor-pointer" : ""}`}
                                onClick={() => {if(isOwner){toggleOpen(isOpen); windowUpdate("followers")}}}
                                >
                                  Followers
                              </span>
                          </p>
                        <p className='text-sm md:text-lg flex flex-row items-center gap-1'>
                          <span 
                            onClick={() => {if(isOwner){toggleOpen(isOpen); windowUpdate("following")}}}
                            className={`${isOwner ? "hover:underline cursor-pointer" : ""}`}>
                          {profileData?.followingCount || 0}
                          </span> 
                          <span 
                            onClick={() => {if(isOwner){toggleOpen(isOpen); windowUpdate("following")}}}
                            className={`${isOwner ? "hover:underline cursor-pointer" : ""}`}>
                              Following
                          </span>
                        </p>
                    </div>
                </div>

                <div className={`${user?.isAdmin ? "mb-10" : "mb-2"} gap-2 mt-1 flex flex-col`}>
                    {user?._id === id ? 
                    <>
                      <NavLink to={`/account-settings`}>
                        <button 
                            className='bg-white text-neutral-900 md:w-48 w-[148px] h-8 rounded-sm   cursor-pointer hover:bg-neutral-200 transition-all ease-in-out duration-75'>
                          Edit Profile
                        </button>
                      </NavLink>
                    {user?.isAdmin ? 
                    <NavLink to={`/control-panel`}>
                          <button className='bg-white text-neutral-900 md:w-48 w-[148px] h-8 rounded-sm cursor-pointer hover:bg-neutral-300 transition-all ease-in-out duration-75 '>
                        AdminPage
                      </button>
                    </NavLink> : <></>}
                    </> : <FollowButton   profileId={id}
                                          profileData={profileData} 
                                          setProfileData={setProfileData}  />}
                </div>
                </div>
            </div>

            <hr className={`${open ? "w-[85%]" : "w-[80%] md:w-[90%]"} ml-12 md:ml-0  text-neutral-500 md:mt-12 ${user?.isAdmin ? "mt-30" : "mt-20"}`} />

            <div className="text-white flex flex-wrap gap-4 mt-5 md:ml-1 ml-0 md:justify-start justify-center">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="cursor-pointer rounded-xl flex flex-col justify-center flex-[1_1_100px] sm:flex-[0_1_auto] min-w-[50px] max-w-[90px] items-center"
                  >
                    <div
                      onClick={() => updateProfileState(item.label.toLowerCase())}
                      className={`${initialState === item.label.toLowerCase() ? "bg-sky-400 text-black" : ""} hover:bg-blue-400 active:bg-sky-600 rounded-sm flex flex-row justify-center items-center px-1 py-1`}
                    >
                      <div className={`shrink-0 ${isSmall ? "text-2xl" : ""}`}>{item.icon}</div>
                      {!isSmall && <p className="mx-2">{item.label}</p>}
                    </div>
                    <div className="w-full h-[1px] bg-neutral-500 mt-3"></div>
                  </div>
                ))}
              </div>

            <ProfileStatePage open={open} />
        </div>
        {
          isOpen ? <ConnectionsList /> : <></>
        }
    </div>
  )
}

export default Profile