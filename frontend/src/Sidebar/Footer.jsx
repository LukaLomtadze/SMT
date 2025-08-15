import React from 'react'
import { RiExpandUpDownLine } from "react-icons/ri";
import { useState, useRef, useEffect } from 'react';
import DropDown from './DropDown';
import { useAuthStore } from '../stateManagment/authStore';
import { MdVerified } from 'react-icons/md';
import Image from '../components/Image';
const Footer = ({visible}) => {


    const[open, setOpen] = useState(false);

    const openDropDown = () => {
        setOpen(prev => !prev);
    }

    const dropDownRef = useRef(null)
    const footerRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(dropDownRef.current && !dropDownRef.current.contains(event.target) && !footerRef.current.contains(event.target)){
                setOpen(false)
            }
        }

        window.addEventListener("mousedown", handleClickOutside)

        return () => {
            window.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const {user} = useAuthStore()


    if(!user){
        return null
    }

    // const imageURL = "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg"

    const email = user.email || "";
    const name = user.name || "";

  return (
    <div>
    <div ref={footerRef} className={` rounded-[10px] flex ${visible ? "px-3 py-1 hover:bg-[#262626]" : "flex-col mb-3 "} items-center gap-2`}
        onClick={visible ? openDropDown : undefined}
    >
        
        <Image visible={visible} openDropDown={openDropDown} />
        
       {visible && (
        <div className='flex flex-row justify-between w-[250px] items-center'>
            <div className='flex flex-col'>
                <div className='-mt-1 flex flex-row  items-center gap-1'>
                    <span className='text-white text-[12px] flex flex-wrap items-center'>{name}<MdVerified className='text-sky-400 text-sm' /></span>
                    </div>
                <span className='text-white text-[10px]'>{email}</span>
            </div>
            <RiExpandUpDownLine />
        </div>
       )}
            
    </div>

    <DropDown ref={dropDownRef} opened={open} setOpen={setOpen} isVisible={visible} name={name} email={email} />
    </div>
  )
}

export default Footer