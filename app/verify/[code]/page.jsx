'use client'

import { verifyCode } from '@utils/dependencies'
import { patchData } from '@vanilla/requests/patch'
import { getSessionData, setSessionData } from '@vanilla/session'
import React, { useEffect } from 'react'


function page({params}) {

    useEffect(()=>{
        const setVerified = async()=>{

            if(params.code === verifyCode){
                const verify = await patchData(`/api/auth/update/${getSessionData('id')}`,{isVerified:true})
            if(verify)setSessionData('isVerified',true)
            window.location.href = '/'
        }
    }
        setVerified()
    })
  return (
    <div className='max-w-fit mx-auto mt-20'>
        <h1 className="mb-4">Verification Successfull</h1>
      <p className="">Redirecting you to homepage..........</p>
    </div>
  )
}

export default page
