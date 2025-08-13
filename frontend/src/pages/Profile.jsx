import React, { useEffect, useState } from 'react'
import { useProfileStore } from '../stateManagment/profileStore'
import { FaHeart } from "react-icons/fa6";
import { BsFillCollectionFill } from "react-icons/bs";
import { useAuthStore } from '../stateManagment/authStore';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MdVerified } from "react-icons/md";

const Profile = ({open}) => {


    const API_URL = "http://localhost:4040/api/auth";

    const items = [
        {label: "Posts", icon: <BsFillCollectionFill />},
        {label: "Liked", icon: <FaHeart />}
    ]

    const{defaultPic} = useProfileStore()

    const {id} = useParams()

    const {user} = useAuthStore()

    const [profileData, setProfileData] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/${id}`, {withCredentials: true})
                setProfileData(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        if(user?._id === id){
            setProfileData(user)
        }
        else{
            fetchProfile()
        }
    }, [id, user])

  return (
    <div className={`${open ? "ml-[270px] w-[85vw] h-screen" : "ml-[60px] w-[95vw] h-screen"} transition-all ease-in-out duration-100 absolute top-0`}>
        <div className='w-full h-full m-4'>
            <div className='mt-10 ml-4 flex flex-row gap-5'>
                <div>
                    <img  src={defaultPic} className='w-32 h-32 rounded-full' />
                </div>
                <div className='flex-col flex h-32 justify-between'>
                <div className='text-white mt-2 w-full'>
                    <div className='flex flex-row items-center w-full gap-2'><p className='text-xl'>{profileData?.name}</p><MdVerified className='text-sky-400' /></div>
                    <p className='text-sm text-neutral-400'>{profileData?.email}</p>
                </div>

                <div className='mb-2'>
                    {user?._id === id && <button className='bg-white text-neutral-900 w-full h-8 rounded-sm cursor-pointer hover:bg-neutral-200 transition-all ease-in-out duration-75'>Edit Profile</button>}
                </div>
                </div>
            </div>

            <hr className={`${open ? "w-[85%]" : "w-[80%] md:w-[90%]"}  text-neutral-500 mt-12`} />

            <div className='text-white flex flex-row gap-3 mt-5'>
                {
                    items.map((item, i) => {
                        return(
                            <div key={i} className='text-white cursor-pointer rounded-xl flex items-center flex-row text-lg'>
                                <div className='h-[50px] mr-2 w-[1px] bg-neutral-500'></div>
                                <div className='hover:bg-neutral-700 rounded-sm flex flex-row items-center px-3'>
                                    <div>{item.icon}</div>
                                    <p className='rotate-90 text-transparent'>{"...."}</p>
                                    <p>{item.label}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Profile