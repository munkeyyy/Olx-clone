import React, { useContext, useEffect, useState } from 'react'
import { ConversationContext } from '../contexts/Conversation/ConversationContext'
import axios from 'axios'
import { baseUrl } from '../utils'

const useGetMessages = () => {
    const[loading, setLoading]=useState(false)
    const {messages,setMessages, selectedConversation, convoId}=useContext(ConversationContext)
    const token = localStorage.getItem("token")
    useEffect(()=>{
        const getMessages=async()=>{
            setLoading(true)
            await axios.get(`http://localhost:8001/api/v1/messages/get/${selectedConversation._id}`,
            {
                headers:{
                  "Authorization": token,
                }
              }
            )
            .then((res)=>{
                console.log(res.data)
                setLoading(false)
                setMessages(res.data)
            })
            .catch((err)=>console.log(err))
        }
        if(selectedConversation?._id) getMessages()
    },[selectedConversation?._id,setMessages])
  return {messages,loading}
}

export default useGetMessages