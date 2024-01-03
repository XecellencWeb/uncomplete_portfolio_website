'use client'

import useFetch from '@hooks/useFetch'
import { getSessionData } from '@vanilla/session'
import { useSession } from 'next-auth/react'
import React, { createContext, useContext } from 'react'

const SiteDataContext = createContext()

export function SiteDataProvider({children}) {
    const planData = useFetch(`/api/plan/get/all`)
    const {data:activeUser} = useSession()
    const user = activeUser?.user || getSessionData(null,'logged_in_user')
  return (
    <SiteDataContext.Provider value={{planData,user}}>
        {children}
    </SiteDataContext.Provider>
  )
}

export const useSiteData = ()=>{
    return useContext(SiteDataContext)
}


