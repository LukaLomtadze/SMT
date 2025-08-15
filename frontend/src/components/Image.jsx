import React from 'react'
import { useAuthStore } from '../stateManagment/authStore';

const Image = ({visible, openDropDown}) => {
    //const {defaultPic} = useProfileStore()
    const {user} = useAuthStore();

    
  return (
    <img className={`transition-all duration-300 ease-in-out cursor-pointer ${visible ? "w-[45px] h-[45px] rounded-2xl" : "w-[35px] h-[35px]"} rounded-full`} src={user?.image}
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