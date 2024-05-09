import React from 'react'
import Message from '../Message/Message'

const Messages = () => {
  return (
    <div className='px-4 mb-24 side flex-1 overflow-auto'>
        <Message/>
        <Message/>
        {/* <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/> */}
        
    </div>
  )
}

export default Messages