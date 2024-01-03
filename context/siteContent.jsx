'use client'

import { createContext, useContext, useState, useEffect } from "react";

const SiteContent = createContext()

export const SiteContentProvider = ({children})=>{
        const [content, setContent] = useState()

        useEffect(()=>{
            const getSiteContent = async()=>{
            const data = await fetch('/api/sitecontent/get')
            if(!data.ok){
              const content = await data.json()
              throw new Error(content)
            }
            const content = await data.json()
            setContent(content)
            }
            getSiteContent()
          },[])
        return <SiteContent.Provider value={{content,setContent}}>
                {children}
        </SiteContent.Provider>
}

export const useSiteContent = ()=>{
    return useContext(SiteContent)
}