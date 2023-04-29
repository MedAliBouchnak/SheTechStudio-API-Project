import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../redux/slices/userSlices'

const Profile = () => {
    const {userInfo} = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserInfo())
    }, [])
  return (
<>
    <div >{userInfo.name}</div>
    <div >{userInfo.address}</div>
    <div >{userInfo.email}</div>
    </>

  )
}

export default Profile