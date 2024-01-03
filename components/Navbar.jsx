'use client'


import React from 'react'
import Image from 'next/image'
import logo from '@assets/logo.png'
import { NavigateToSection } from '@vanilla/togglePage'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { getSessionData } from '@vanilla/session'
import profilePic from '@assets/profile_pics.jpg'
import { useSession } from 'next-auth/react'
import { toBuyToken } from '@constants/tokens'

export default function Navbar() {
  const {data:providerSession} = useSession()
  const session = getSessionData()
  const isLoggedIn = session || providerSession
  const isUserPicture = session?.picture || providerSession?.user.picture
  const pathname = usePathname()
  const params = useSearchParams()
  const sign = params.get('sign')
  const ishome = pathname === '/'
  return (
    <div className={`${pathname.includes('profile') ? 'hidden': (pathname.includes('order') && (sign === toBuyToken)) && 'hidden'} absolute top-0 left-0 z-10 w-screen  ${!ishome && 'bg-slate-50 bg-opacity-60 border-b-2 border-gray-700 m-0'}`}>
    <div className={` head_wrapper  flex justify-between items-center h-20 `}>
    <Link href='/' className="logo">
        <Image
        src={logo}
        alt='website logo'
        width={50}
        height={70}
        className='rounded-full'
        />
        <p className={`logo_text ${ishome ? 'text_white': 'text_black'} hover:underline `}>Josiah Newman</p>
    </Link>
    <nav className='navbar_ds'>
      <ul className="">
        <li className="">
          <Link href="/portfolio" className={`${ishome? 'h_black':'h_secondary'}`}>See Works</Link>
          </li>
        <li className="">
          <Link href="/order" className={`h_text`}>Place Order</Link>
        </li>
        <li className="">
          <Link href="/articles" className={` ${ishome ? 'text_white':'text_black'}`}>Articles</Link>
          </li>
        <li className="">
          <Link href="/policy" className={` ${ishome ? 'text_white':'text_black'}`}>Policy</Link>
          </li>
          {
            isLoggedIn?
            <li className='pl-4'>
            <Link href='/profile' className="hover_except must_flex items-center gap-1">
              <span className="text_accent font_croissant text_2 hover:text-slate-50">Profile page</span>
              <div className="image--container rounded-full overflow-hidden hover:scale-105">
              {
                isUserPicture?
              <Image
              src={isUserPicture}
              alt='Profile picture'
              width={50}
              height={50}
              
              />
              :<Image
              src={profilePic}
              alt='Profile picture'
              width={50}
              height={50}
              
              />
}
              </div>
            </Link>
            </li>
            :<>
        <li className=''>
          <button onClick={()=>NavigateToSection('login')} className="g_secondary">Log In</button>
        </li>
        <li className=''>
          <button onClick={()=>NavigateToSection('signup')} className="h_accent">Sign Up</button>
        </li>
        </>
}
      </ul>
    </nav>




    <nav className="navbar_sm">
      <input type="checkbox" name="" id="controller" className="sm_controller" />
      <label htmlFor='controller' className="sm_menu"/>
      <ul className="bg_primary">
        <li className="">
          <Link href="/portfolio" className={`text_bg`}>Portofolio</Link>
          </li>
        <li className="">
          <Link href="/order" className={`text_bg`}>Place Order</Link>
        </li>
        <li className="">
          <Link href="/articles" className={`text_bg`}>Articles</Link>
          </li>
        <li className="">
          <Link href="/policy" className={`text_bg`}>Policy</Link>
          </li>
          {
            isLoggedIn?
            <li className='pt-4'>
            <Link href='/profile' className="hover_except must_flex items-center gap-1">
              <span className="text_accent font_croissant text_2 hover:text-slate-50">Profile page</span>
              <div className="image--container rounded-full overflow-hidden hover:scale-105">
              {
                isUserPicture?
              <Image
              src={isUserPicture}
              alt='Profile picture'
              width={50}
              height={50}
              
              />
              :<Image
              src={profilePic}
              alt='Profile picture'
              width={50}
              height={50}
              
              />
}
              </div>
            </Link>
            </li>
            :<>
        <li className='mt-4'>
          <button onClick={()=>NavigateToSection('login')} className="g_secondary">Log In</button>
        </li>
        <li className='mt-2'>
          <button onClick={()=>NavigateToSection('signup')} className="h_accent">Sign Up</button>
        </li>
        </>
}
      </ul>
    </nav>
    </div>
    </div>
  )
}
