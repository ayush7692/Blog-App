import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useAuthStatus = () => {
    const{user}= useSelector(store => store.auth)

    const [checkStatus, setCheckStatus] = useState(true)
    const [authorised, setAuthorised] = useState(Boolean(user))

  useEffect(()=>{
    if(user){setAuthorised(true)}else{setAuthorised(false)}
    setCheckStatus(false)
     },[user])

  return {checkStatus,authorised}
}

export default useAuthStatus