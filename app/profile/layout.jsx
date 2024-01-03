'use client'

import { useSiteData } from '@context/siteData'
import { popup } from '@vanilla/box/popupbox'
import { deleteSession } from '@vanilla/session'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'





const profileRoutesArr = [
  {
    name:'Admin Dashboard',
    path:'/profile',
    protected:true
  },
  {
    name:'Site Content',
    path:'/profile/sitecontent',
    protected:true
  },
  {
    name:'Manage Portfolios',
    path:'/profile/portfolios',
    protected:true
  },
  {
    name:'Website Pages',
    path:'/profile/pages',
    protected:true
  },
  {
    name:'Users',
    path:'/profile/users',
    protected:true
  },
  {
    name:'Your Orders',
    path:'/profile/orders',
    protected:true
  },
]
















function layout({children}) {
  const {data:providerSession} = useSession()
  const {user:isLoggedIn} = useSiteData()
  const pathname = usePathname()

  const route = useRouter()

  useEffect(()=>{
        if(!isLoggedIn)route.push('/')
  },[])

  const logout = async()=>{
    const confirm = await popup({
      text: 'Are you sure you want to log out?',
      type: 'confirm'
    })
  
    if(confirm.yes){
      if(providerSession) return signOut()
      deleteSession('logged_in_user')
    }
  }

  return (
    <>
    <input type="checkbox" name="" id="open-one" defaultChecked = {pathname === '/profile/pages/addarticle'?true:false}/>
    <div className='profile_container'>
      <div className="profile_one bg-gray-900">
        <ul className="profile_nav">
        {
            profileRoutesArr.map(route => (
              <li key={route.name} className={`${pathname === route.path && 'active'}`}><Link href={route.path}>{route.name}</Link></li>
            ))
          }
          <li className=''><button onClick={logout} className=" w-4/5 ml-2 text_1 px-20 mt-4 h_white">Logout</button></li>
        </ul>
      </div>
      <div className="profile_main">
        <div className={pathname !== '/profile/pages/addarticle' ? "wrapper": 'w-screen'}>
          {children}
        </div>
      </div>
      
    </div>
    </>
  )
}

export default layout
