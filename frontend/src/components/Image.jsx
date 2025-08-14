import React from 'react'
import { useProfileStore } from '../stateManagment/profileStore';

const Image = ({visible, openDropDown}) => {
    const {defaultPic} = useProfileStore()
  return (
    <img className={` transition-all duration-300 ease-in-out cursor-pointer ${visible ? "w-[40px] h-[40px] rounded-2xl" : "w-[35px] h-[35px]"} rounded-full`} src={defaultPic}
            onClick={(e) => {
                if(!visible){
                    openDropDown(); 
                    e.stopPropagation()
                }
            }}
        />
  )
}

export default Image