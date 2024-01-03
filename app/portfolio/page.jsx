'use client'

import Loader from '@components/Loader'
import ShowPortfolio from '@components/showPortfolio'
import { devGenre } from '@constants/contents'
import useFetch from '@hooks/useFetch'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import workPics from '@assets/workspics.jpg'
import Image from 'next/image'
import Link from 'next/link'
import usePagination from '@hooks/usePagination'

const PortfoliosPage = () => {
    const param = useSearchParams()
    const name = param.get('name')
    const pageNo = parseInt(param.get('pageno')) || 1
    
    const {data:allWorks,loading} = useFetch(`/api/portfolio/get/type/${name || devGenre[0]}`)
    const router = useRouter()
    const {pageItems,prevPage,nextPage} = usePagination(allWorks,{
      pageNo
    })

  
  return (
    <div className='snapper'>
        <section className="w-full isolate relative">
          <Image src={workPics} alt='work pics' className='mask_fade' />
          <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-black font_kenia">The</h1>
          <h1 className="font_bungee ">Works Of My Hands</h1>
          <p className="text_1 mt-8">Explore Amazing works done my me and get a reason to hire me.</p>
          </div>
        </section>
        <section className="">
          <div className="wrapper pt-40">

            <div className="flex max-sm:flex-col justify-between">

                <div className="flex gap-2">
                <i className="bi bi-emoji-sunglasses-fill"></i>
                <p className="">Am an expert in:</p>
                </div>

                <select value={param.get('name') || ''} onChange={(e)=>router.push(`?name=${e.target.value}`)} name="" id="" className=" px-12 py-2 rounded-full">
                    <option value="" className="">Web Development</option>
                    {devGenre.map((genre,index)=>(
                    <option key={index} value={genre} className="capitalise">{genre}</option>
                    ))
                }
                </select>
                </div>
                <div className="mt-20">


                {
                  loading?(
                    <Loader/>
                  ):
                  pageItems?.map((work)=>(
                    <ShowPortfolio key={work._id} portfolio={work} lessView={true}/>
                    )
                    
                    )
                  }
                </div>

                <div className="flex justify-between w-full">
                  {
                    prevPage && (
                      <Link className='text-blue-500 underline' href={`?pageno=${pageNo-1}`}>Prev Page</Link>
                    )
                  }
                  {
                    nextPage && (
                      <Link className='text-blue-500 underline' href={`?pageno=${pageNo+1}`}>Next Page</Link>
                    )
                  }
                </div>
          </div>
        </section>
        
    </div>
  )
}

export default PortfoliosPage
