import React from 'react'
import Conversation from '../Conversation/Conversation'

const SideBar = () => {
  return (
    <div className='w-full overflow-clip relative'>
        <div className='header bg-[#EBEEEF] stick top-0 flex border-b-2 justify-start px-3 py-[18px]'>
            <h1  className='text-xl font-bold roboto'>INBOX</h1>
        </div>
        <div className='mt-2 side h-[60vh]  overflow-auto'>
            <Conversation/>
            <Conversation/>
            
            {/* <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/> */}
            
        </div>
    </div>
  )
}

export default SideBar