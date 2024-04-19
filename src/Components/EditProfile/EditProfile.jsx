import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/User/UserContext'

const EditProfile = () => {
    const{user}=useContext(UserContext)
    const [active, setActive]=useState("profile")
  return (
    <div className='flex items-start gap-6 realtive p-10'>
       <div className='w-[20%] box-shadow   sticky top-0  '>
            <div onClick={()=>setActive("profile")} className={`roboto cursor-pointer my-2 text-[1.1vw] ${active==="profile"?"font-semibold text-black":"font-normal text-gray-400"}`}>Edit Profile </div>
            <div onClick={()=>setActive("picture")} className={`roboto cursor-pointer my-2 text-[1.1vw] ${active==="picture"?"font-semibold text-black":"font-normal text-gray-400"}`}>Profile Picture</div>
       </div>
       <div className='border border-[rgba(0,0,0,0.15)]'>
            
       </div>
    </div>
  )
}

export default EditProfile