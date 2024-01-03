'use client'


import Loader from '@components/Loader'
import useFetch from '@hooks/useFetch'
import React from 'react'
import { cardStyle, flexVerticalClass } from '../page'
import Link from 'next/link'

const AllPortfolio = () => {
    const {data:allPortfolio,loading} = useFetch(`/api/portfolio/get/all`)
  return (
    loading?(
        <Loader/>
    ):(
        <div className="flex flex-col gap-10 sm:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 pt-20">

        {allPortfolio?.map((portfolio,index)=>(
            <Link href={portfolio._id} key={portfolio._id} className={flexVerticalClass+cardStyle}>
                <h3 className="mb-4">{portfolio.name}</h3>
                <p className="t_view_less">{portfolio.description}</p>
            </Link>
        ))}
        </div>
    )
  )
}

export default AllPortfolio
