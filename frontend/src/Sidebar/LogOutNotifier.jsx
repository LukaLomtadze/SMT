import React, { useEffect, useRef } from 'react'
import { IoMdClose } from "react-icons/io";
import { useSidebarStore } from './useSidebarStore';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stateManagment/authStore';

const LogOutNotifier = () => {
  
    const {setOpening, close} = useSidebarStore()

    const logRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(logRef.current && !logRef.current.contains(event.target)){
                close()
            }
        }

        window.addEventListener("mousedown", handleClickOutside)

        return () => {
            window.removeEventListener("mousedown", handleClickOutside)
        }
    }, [close])

    const navigate = useNavigate();
    const {logout, user} = useAuthStore()

    if(!user){
        return null
    }

    const handleLogOut = async() => {
        try{
            await logout()
            navigate('/login')
            close()
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen z-50">
      <div className="absolute top-0 left-0 w-full h-full opacity-60 bg-black bg-opacity-60 z-0"></div>
      
      <div ref={logRef} className="w-[260px] h-[300px] bg-[#212121] z-10 relative flex flex-col rounded-lg">
        <div className='flex w-full justify-end h-[40px]'>
            <IoMdClose onClick={setOpening} className='mr-2 mt-2 text-2xl text-white cursor-pointer' />
        </div>
        <div className='w-full flex items-center flex-col mt-3 text-lg text-gray-200'>
            <h1>Are you sure</h1>
            <h1>you want to log out?</h1>
        </div>
        <div className='w-full items-center flex flex-col mt-3 text-sm text-gray-300'>
            <h1>
                Log out of Sidebar.jsx as
            </h1>
            <h1>
                {user.email || ""}
            </h1>
        </div>
        <div className="w-full flex items-center h-72 flex-col mt-20">
            <button onClick={handleLogOut} className='w-[200px] h-10 cursor-pointer bg-white text-black rounded-[12px]'>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default LogOutNotifier;