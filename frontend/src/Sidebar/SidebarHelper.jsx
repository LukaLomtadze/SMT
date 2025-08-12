import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBarHelper = ({insideItems}) => {
  return (
    <div className='w-[180px] '>
        {
            insideItems.map((item, i) => {
                return(
                    <div key={i} className='flex flex-row'>
                        <div className='w-[1.5px] ml-5 h-auto bg-[#2e2e2e] mr-3'></div>
                        <div className='flex flex-col w-full justify-center gap-3'>
                            {
                                item.trim() === ""  ? "" : 
                                <NavLink to={`/${item}`}>
                                    <div className=' flex flex-row gap-3 items-center px-3 py-1 transition-all duration-75 ease-in-out cursor-pointer hover:bg-[#262626] rounded-[8px]'>
                                        <span className='text-[14px]'>{item}</span>
                                    </div>
                                </NavLink>
                            }
                            
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default SideBarHelper