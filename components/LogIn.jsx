'use client'

import React, { useRef, useState } from 'react'
import { NavigateToSection, optOut } from '@vanilla/togglePage'
import { postData } from '@vanilla/requests/post'
import { setUserSession } from '@vanilla/session'
import { useRouter } from 'next/navigation'
import ShowProviders from './ShowProviders'

export default function LogIn() {
    const route = useRouter()
    const controller = useRef()
    const emailref = useRef()
    const passwordref = useRef()
    const [submiting, setSubmiting] = useState(false)


    const handleSubmit = async(e)=>{
      e.preventDefault()
      setSubmiting(true)
      const data = {
        email: emailref.current.value,
        password: passwordref.current.value
      }

      const response = await postData('/api/auth/login',data)
      if(!response) return 
      setSubmiting(false)
      const verified = await setUserSession(response,'logged_in_user')

      if(verified.done)route.push('/')

    }


  return (
    <div className='group'>
    <input ref={controller} data-type='login' data-section='true' type="checkbox" defaultChecked={true} className="peer hidden" />
    <div onClick={(e)=>optOut(e,controller)} data-type='parent' className='peer-checked:hidden fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-90' style={{zIndex:10000}}>
    <form onSubmit={handleSubmit} action="" className="form">
            <div className="w-48 mx-auto flex flex-col gap-1">
            <h3 className="mb-4 text_3 font-bold">Log In</h3>
            <input ref={emailref} placeholder='Enter your Email....' type="text" className="form_input" />
            <span className="error_d"></span>
            <input ref={passwordref} placeholder='Enter your Password....' type="text" className="form_input" />
            <span className="error_d"></span>
            <ShowProviders/>
            <p className="text_1">Don't have an Account, <button type='button' onClick={()=>NavigateToSection('signup')} className="text_accent hover:underline text_1">Sign Up</button></p>
            <button disabled={submiting} className="bg_primary text_bg w-fit px-4 py-2 mt-8 rounded-lg self-end text_1">{submiting?'Logging In....':'Log In'}</button>
            </div>
          </form>
    </div>
    </div>
  )
}
