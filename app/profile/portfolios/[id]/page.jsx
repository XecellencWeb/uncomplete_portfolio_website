'use client'


import IframeLoader from '@components/IframeLoader'
import Loader from '@components/Loader'
import useFetch from '@hooks/useFetch'
import React, { useState } from 'react'
import { deleteData } from '@vanilla/requests/delete'
import { authBox } from '@vanilla/box/authbox'
import ShowPortfolio from '@components/ShowPortfolio'

const OnePortfolio = ({params}) => {
    const {data:portfolio,loading} = useFetch(`/api/portfolio/get/${params.id}`)
    const [isLoading,setLoading] = useState(false)
    const [isGetting,setGetting] = useState(false)
    const portfolioProps = {
        portfolio,
        deletePortfolio,
        isLoading,
        isGetting,
        setGetting
    }

const deletePortfolio = async()=>{
    setLoading(true)
    try {
        await deleteData(`/api/portfolio/delete/${params.id}`)
        authBox(200,'Delete Successfull')
    } catch (err) {
        console.log(err)
    }finally{
        setLoading(false)
    }
}



  return (
    <div className="wrapper">

   { loading?(
        <Loader/>
    ):(
        <ShowPortfolio {...portfolioProps} />
    )}
    </div>
  )
}

export default OnePortfolio
