import React from 'react'
import useAuthStatus from '../hooks/useAuthStatus'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateComponent = () => {

    const {checkStatus,authorised}=useAuthStatus()

    if(checkStatus){
        console.log("loading")
    }



  return authorised? <Outlet/> : <Navigate to={"/login"}  />
}

export default PrivateComponent