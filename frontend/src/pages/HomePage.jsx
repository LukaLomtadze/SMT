import React from 'react'

const HomePage = ({open}) => {
  return (
    <div className={`${!open ? "-mt-9" : "mt-0" } p-5 w-screen h-screen absolute bg-amber-200 z-0 -mt-9`}>
      <div className={`${open ? "ml-72" : "ml-18" } transition-all ease-in-out duration-100`}>
        asdasdas
      </div>
    </div>
  )
}

export default HomePage