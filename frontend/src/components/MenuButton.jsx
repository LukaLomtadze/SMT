import React, { useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'

const MenuButton = () => {

    const[openMenu, setOpenMenu] = useState(false)
  return (
    <>
    <div>
      <div onClick={() => setOpenMenu(prev => !prev)} className={`hover:rounded-full ${openMenu ? "bg-neutral-600 rounded-full" : ""} cursor-pointer hover:bg-neutral-700 h-8 w-8 flex-col items-center justify-center`}>
        <button className={`cursor-pointer`}>
          <HiDotsVertical />
        </button>
        
      </div>
      <InsideMenu openMenu={openMenu} />
      </div>
    </>
  )
}

const InsideMenu = ({openMenu}) => {
  return(
    <div className={`transition-all fixed duration-100 ease-in-out ${openMenu? "w-14 h-40 " : "w-14 h-0"} bg-red-600`}></div>
  )
}


export default MenuButton