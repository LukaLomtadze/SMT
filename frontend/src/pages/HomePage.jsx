import React from 'react'

const HomePage = ({open}) => {
  return (
    <div className={`${open ? "ml-[270px]" : "ml-[60px]"} transition-all ease-in-out duration-300`}>HomePage</div>
  )
}

export default HomePage