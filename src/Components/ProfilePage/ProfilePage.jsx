import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../contexts/User/UserContext'

const ProfilePage = () => {
    const {user}=useContext(UserContext)
  return (
    <div>
        
    </div>
  )
}

export default ProfilePage