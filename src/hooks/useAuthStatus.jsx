import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useAuthStatus = () => {
    const{user}= useSelector(store => store.auth)

    const [checkStatus, setCheckStatus] = useState(true)
    const [authorised, setAuthorised] = useState(false)

  useEffect(()=>{
    setAuthorised(Boolean(user))
    setCheckStatus(false)
     },[user])

  return {checkStatus,authorised}
}

export default useAuthStatus