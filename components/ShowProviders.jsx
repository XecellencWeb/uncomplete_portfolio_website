'use client'

import React, { useEffect, useState } from 'react'
import { signIn,getProviders } from 'next-auth/react'
import googleIco from '@assets/google-icon.png'
import Image from 'next/image'


function ShowProviders() {
    const [providers, setProviders] = useState(null)
    useEffect(()=>{
        const defineProviders = async()=>{
            const allproviders = await getProviders()
            setProviders(allproviders)
        }
        defineProviders()
    },[])
  return (
    <div className="mt-4">
        {
            providers?Object.values(providers).map(provider => 
                <button type='button' key={provider.name} onClick={()=>signIn(provider.name.toLowerCase())} className="text_1 border-2 border-gray-100 border-solid px-4 py-2 rounded-lg flex items-center">{provider.name === 'Google' &&
                <Image
                src={googleIco}
                width={20}
                height={20}
                alt='Google Icon'
                className='pr-1'
                />}<span>Sign in with {provider.name}</span></button>
                ):<div className='loading_dot_container'>Loading Providers.....</div>
        }
    </div>
  )
}

export default ShowProviders
