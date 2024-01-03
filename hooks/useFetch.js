'use client'

import React, { useEffect, useState } from 'react'

function useFetch(url) {
    const [data,setData] = useState()
    const [loading,setLoading] = useState(false)
    const [err,setErr] = useState()
    const [refresh,setRefresh] = useState(false)

    const refetchData = ()=>{
        setRefresh(prev => !prev)
    }

    const fetchData = async(url)=>{
        setLoading(true)
        try {
            
            const res = await fetch(url)
            if(!res.ok){
                const er = await res.json()
                throw new Error(er)
            }

            const info = await res.json()
            setData(info)
            setLoading(false)
        } catch (err) {
            setErr(err)
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData(url)
    },[url,refresh])

  return {loading,err,data,fetchData,refetchData}
}

export default useFetch
