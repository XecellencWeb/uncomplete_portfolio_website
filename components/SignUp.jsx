'use client'


import { NavigateToSection, offPages, optOut } from '@vanilla/togglePage'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { postData } from '@vanilla/requests/post'
import { setUserSession } from '@vanilla/session'
import ShowProviders from './ShowProviders'

export default function SignUp() {
    const controller = useRef()
    const nameref = useRef()
    const emailref = useRef()
    const passwordref = useRef()
    const [submiting, setSubmiting] = useState(false) 
    
    const handleSubmit = async(e)=>{
      e.preventDefault()
      setSubmiting(true)
      const data = {
        fullName:nameref.current.value,
        email: emailref.current.value,
        password: passwordref.current.value
      }

      const response = await postData('/api/auth/signup',data)
      if(!response) return 
      setSubmiting(false)
      await setUserSession(response,'logged_in_user')
    }
    return (
        <div className='group'>
        <input ref={controller} data-type='signup' data-section='true' type="checkbox" defaultChecked={true} className="peer hidden" />
        <div data-type='parent' onClick={(e)=>optOut(e,controller)} className='peer-checked:hidden fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-90' style={{zIndex:10000}}>
          <form onSubmit={handleSubmit} action="" className="form">
            <div className="w-48 mx-auto flex flex-col gap-1">
            <h3 className="mb-4 text_3 font-bold">Sign Up</h3>
            
            <input ref={nameref} placeholder='Enter your Full Name......' type="text" className="form_input"/>
            <span data-empty="This can't be empty." className="error_d"></span>
            <input ref={emailref} placeholder='Enter your Email....' type="text" className="form_input" />
            <span className="error_d"></span>
            <input ref={passwordref} placeholder='Enter your Password....' type="text" className="form_input" />
            <span className="error_d"></span>
            <ShowProviders/>
            <p className="text_1">Already have an Account, <button type='button' onClick={()=>NavigateToSection('login')} className="text_accent text_1 hover:underline">Log In</button></p>
            <button disabled={submiting} className="bg_primary text_bg w-fit px-4 py-2 mt-8 rounded-lg self-end text_1">{submiting?'Registering.....':'Register'}</button>
            </div>
            <p className="mx-8 mb-8 text_2">Note registering to my website means you comply to my website policy and agreements.<Link onClick={offPages} className='text_accent italic hover:underline' href='/policy'> Read Policy.</Link> </p>
          </form>
        </div>
        </div>
      )
}
