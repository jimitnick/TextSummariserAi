import React from 'react'

const SideBar = (props) => {
  return (
    <>
      
      <div className={`z-10 h-full w-[70%] flex  xl:w-[20%] ${props.display ? "flex" : "hidden"} flex-col bg-zinc-700 justify-between items-center absolute left-0 ${props.display ? "backdrop:blur-xl" : "backdrop:blur-none"}`}>
        <div className='chatHistory flex flex-col justify-center items-center w-full h-[calc(100%-64px)] text-white'>
          Your chat history appears here
        </div>
        <div className='profile flex p-4 items-center hover:bg-zinc-500 cursor-pointer justify-between md:justify-between w-full border-t-1 border-white'>
          <span className='md:text-xl text-white'>{props.displayName}</span>
          <img src={props.photo} className='h-6 w-6 text-white'/>
        </div>
      </div>
  </>
  )
}

export default SideBar
