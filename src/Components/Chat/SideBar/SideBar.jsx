import React from 'react'
import Conversation from '../Conversation/Conversation'

const SideBar = () => {
  return (
    <div className='w-full h-[75vh] overflow-auto relative'>
        <div className='header bg-[#EBEEEF] stick top-0 flex border-b-2 justify-start p-3'>
            <h1  className='text-xl font-bold roboto'>INBOX</h1>
        </div>
        <div className='mt-2'>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
        </div>
    </div>
  )
}

export default SideBar