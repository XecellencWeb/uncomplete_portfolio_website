'use client'
import React, { useEffect } from 'react'
import me from '@assets/josiah_newman.png'
import Image from 'next/image'
import { useSiteContent } from '@context/siteContent'
import { strToArr } from '@vanilla/string_methods/sting'
import Link from 'next/link'
import { customScroll } from '@vanilla/animations/customscroll'
import PaymentNoted from '@components/PaymentNoted'
import useFetch from '@hooks/useFetch'
import Loader from '@components/Loader'
import { spacer } from '@constants/regexp'
import ShowPortfolio from '@components/ShowPortfolio'
import ArticleDesc from '@components/ArticleDesc'

export default function Page({searchParams}) {
  const {content} = useSiteContent()
  const {data:somePortfolio,loading} = useFetch(`/api/portfolio/get/number/3`)
  const {data:someArticles,loading:articleLoading} = useFetch(`/api/articles/get/number/3`)
  
  useEffect(()=>{
    
    customScroll()
    window.onscroll = ()=>{
    customScroll()
    }
  },[content])

  

  return (
    <>
    <PaymentNoted searchParams = {searchParams}/>
    <section data-scroll = 'shrink' className="shrink move-up curve--container w-screen" style={{
      height: 'clamp(70vh, 100vh - 10vw, 100vh)'
    }}>

        <div className="wrapper">
        <h1 className="mt-32"><span className="font_croissant text-[1.6rem] sm:text-[2.5rem] inline-block"><span className="font_felipa text-[1.2rem] sm:text-[1.5rem]">Hello Everyone,</span> am Josiah Newman</span><br/>
        <span className="font_felipa text-[1.2rem] sm:text-[1.2rem]">a </span>
        <span className="text_gradient to_background_accent--right font_alfa text-[2.5rem] sm:text-[4rem]">fullstack developer</span>
        </h1>
        <p className="my-8 max-w-3xl text_1">
            {content?.bio}
        </p>
        <div className="flex gap-2 items-center">
          <p className={`w-fit text_1 ${content?.available? 'g_success': 'g_normal'}`}>Available Now</p>
          <Link href='/orders'className="h_black w-fit text_1">Hire me</Link>
        </div>
        </div>
        <div className="bg--curved-br bg--to_primary">
            <Image className='absolute right-1/4 max-lg:translate-x-1/2 -bottom-12'
             src={me}
             alt='Picture of Myself'
             width={480}
            height={720}
            />
        </div>
    </section>


    <div data-scroll='jump-out' className="">
    <div data-scroll='through' className="blue_shining_gradient"/>
   <section data-scroll='jump-up' className="">
      <div className="wrapper">
        <h2 className="mb-4">About Me</h2>
        {strToArr(content?.about,spacer)?.map((sentence,index)=><p className='mb-2' key={index}>{sentence}</p>)}
      </div>
    </section>
    </div>

    <section  className="min-h-screen">
      <div className="wrapper max-sm:py-20 py-40">
        <h2 className="mb-4 font_wavy_2">Skills</h2>
        <p className="mt-8 mb-3 ">As a FullStack Developer, I am an expert in the following languages</p>
        <ul data-scroll = 'appear' className="w-full min-h-[30vh]">
          {content?.tools?.map((tool,index)=>{
            return <li key={index} className="font_wavy_2 inline-block w-fit mr-4 mb-2" style={{
              ['--current']:index+1
            }}>{tool}</li>
          })}
        </ul>
        <p className="mb-4">With the Tools Listed above, I am able to use this tools to provide you with the following services</p>
      {
        content?.skills?.map(skill=>
          <div key={skill._id} className="mb-8">
            <h3 className="mb-2">{skill.name}</h3>
            <p className="">{skill.desc}</p>
          </div>
          )
        }
      </div>
    </section>
      <section className="">
        {somePortfolio?.length > 0 && <h2 className="font_wavy_2 text-center mb-8">Works</h2>}
        <div className="wrapper flex flex-col gap-5">
          {
            loading?(
              <Loader/>
            ):(
            
            <>
            {
              somePortfolio?.map((work)=>(
              <ShowPortfolio key={work._id} portfolio={work} lessView={true}/>
              
                ))
            } 
            {somePortfolio?.length > 0 && <Link href='/portfolio' className="py-4 px-8 text_white bg_primary mt-8 block w-fit">View more Works</Link>}
            
            </>
            )
          }
        </div>
      </section>

      <section className="">
        {someArticles?.length > 0 && <h2 className="font_wavy_2 text-center mb-8">Articles</h2>}
        <div className="wrapper flex flex-col gap-5">
          {
            loading?(
              <Loader/>
            ):(
            
            <>
            {
              someArticles?.map((article)=>(
              <ArticleDesc key={article._id} article={article} />
              
                ))
            } 
            {someArticles?.length > 0 && <Link href='/articles' className="py-4 px-8 text_white bg_primary mt-8 block w-fit">View more Articles</Link>}
            
            </>
            )
          }
        </div>
      </section>
    </>
  )
}
