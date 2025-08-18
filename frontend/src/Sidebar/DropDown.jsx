import React, { forwardRef } from 'react'
import { LuSparkles } from "react-icons/lu";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { LuBell } from "react-icons/lu";
import { LuCreditCard } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
// import { useAuthStore } from '../stateManagment/authStore';
// import { useNavigate } from 'react-router-dom';
import { useSidebarStore } from './useSidebarStore';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../stateManagment/authStore';
import { MdVerified } from 'react-icons/md';

const DropDown = forwardRef(({ email, name, isVisible ,opened, setOpen }, ref) => {

    const items = [
        {icon: <RiVerifiedBadgeLine />, label: "Account"},
        {icon: <LuCreditCard />, label: "Upgrade to Pro"},
        {icon: <LuBell />, label: "Notifications"},
    ]

    const {setOpening} = useSidebarStore()

    const{user} = useAuthStore();
  return (
    <div className={`${opened ? "" : "hidden"} transition-all duration-300 ease-in-out absolute bg-[#262626] w-[250px] h-[305px] ${isVisible ? "md:left-[230px] bottom-[70px] md:bottom-[50px] sm:left-[105px]" : "left-[55px] bottom-5"} flex flex-col border-1 border-[#3c3c3c] rounded-2xl`}
        ref={ref}
    >
        <div className='flex flex-row w-[248px] items-center p-3 py-5 h-[60px] gap-2 border-1 border-b-[#3c3c3c] border-t-0 border-l-0 border-r-0'>
            <img src={user?.image} className='w-[40px] h-[40px] rounded-full object-cover' />
            <div className='flex flex-col'>
            <div className="flex flex-row text-sm flex-wrap items-center gap-1 max-w-[150px]">
                <span className="flex flex-wrap items-center gap-1 max-w-[150px] break-all whitespace-normal">
                {name}
                {user?.isAdmin || user?.hasBadge ? <MdVerified className="text-sky-400 text-xl flex-shrink-0" /> : <></>}
                </span>
            </div>

                <span className='text-[14px]'>{email}</span>
            </div>
        </div>
        <div className='flex w-[248px] justify-center h-[50px] pb-1 pt-1 border-b-1 border-[#3c3c3c]'>
            <div className='flex flex-row gap-2 items-center p-3 hover:bg-[#333232] rounded-[10px] w-[230px] h-[40px]' >
                <LuSparkles className='text-gray-300 text-[18px]' />
                <span className='text-[14px]'>Upgrade to Pro</span>
            </div>  
        </div>
        <div className='flex flex-col items-center border-b-1 border-b-[#3c3c3c] py-2'>
            {
                items.map((item, i) => {
                    return(
                        <div key={i} onClick={() => {setOpen(false)}}>
                            <NavLink to={`${i == 0 ? `/${item.label.toLowerCase()}/${user?._id}` : `/${item.label}`} `}>
                            <div className='flex flex-row gap-2 items-center p-3 hover:bg-[#333232] rounded-[10px] w-[230px] h-[40px]'>
                                <div className='text-[18px] text-gray-300'>{item.icon}</div>
                                <span className='text-[14px]'>{item.label}</span>
                            </div>
                            </NavLink>
                    </div>
                    )
                })
            }
        </div>
        <div className='flex flex-col items-center py-2'>
            <div  onClick={() => {setOpen(false), setOpening()}} className='flex flex-row gap-2 cursor-pointer items-center p-3 hover:bg-[#333232] rounded-[10px] w-[230px] h-[40px]'>
                <MdOutlineLogout className='text-gray-300 text-[18px]' />
                <span className='text-[14px]'>Log Out</span>
            </div>
        </div>
    </div>
  )
});

export default DropDown