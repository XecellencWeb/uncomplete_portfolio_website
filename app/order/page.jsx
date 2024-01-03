'use client'

import React, { useEffect } from 'react'
import mapped from '@assets/profile_map.jpg'
import Image from 'next/image'
import { animeInsert, customScrollSetter } from '@vanilla/animations/customscroll'
import { useSiteContent } from '@context/siteContent'
import Link from 'next/link'
import { serviceText } from '@constants/contents'
import { animateAT } from '@vanilla/interception_observers/classAdder'
import useFetch from '@hooks/useFetch'
import { toBuyToken } from '@constants/tokens'
import useCurrency from '@hooks/useCurrency'
import Loader from '@components/Loader'


const DisplaySkills = ({skills,wantedSkill})=>(
    skills?.map((skill,index)=>(
    <li key={skill+index} className={(!wantedSkill && index === 0)?'font_poller text_auto leading-[1]':(wantedSkill === skill.name)?'font_poller text_auto leading-[1]':'scale-50 underline text_accent cursor-pointer' }><Link href={`?wantedSkill=${skill.name}`}>{skill.name+' Services'}</Link></li>))
)








function Orderpage({searchParams}) {
  const wantedSkill = searchParams?.wantedSkill
  const {content} = useSiteContent()
  const {data:plans,loading} = useFetch(`/api/plan/get/name/${wantedSkill || 'Web Development'}`)

  const {convToCounCur} = useCurrency()




  useEffect(()=>{
    customScrollSetter()
    animeInsert('move-up','0','[data-scroll = shrink]')


    window.onscroll = ()=>{
      animeInsert('move-up','0','[data-scroll = shrink]')
      customScrollSetter()
    }

    animateAT('[data-appear]',{styles:['fade-in']})
  },[content])


  
  return (<>
    <section data-scroll = 'shrink' className='h-screen'>
        <div className="wrapper relative justify-between items-center h-screen max-sm:h-[70vh] ">

            
                <Image src={mapped} alt='guarantor Image' className='splashed_image absolute top-1/2 -translate-y-1/2'/>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-fit text-right">
            <h1 data-scroll='rotate-up' className="font_nabla text-right">
                Assured Quality Service Guaranteed.
            </h1>
            <p className="text-right text_1"> Get your Business booming with just a click.</p>
            </div>
        </div>
    </section>
        <section className='w-full flex flex-col items-center text-center '>
          <ul className="head_wrapper">
              <DisplaySkills skills={content?.skills} wantedSkill={wantedSkill}/>
         </ul>
         <div data-appear className="small_wrapper mt-10">
            <p className="text_1">{content?.skills && serviceText[wantedSkill?.split(' ')[0]?.toLowerCase() || 'web']}</p>
         </div>
        </section>
        <section className="pt-20">
          <div className="wrapper">
          {loading?<Loader/>
          :plans?.map(plan => (
            <div key={plan._id} className="">
              <h3 className="mb-2 font_abril">{plan.name}</h3>
              <p className="mb-20">{plan.desc}</p>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-20 px-12 md:gap-40 md:px-20 pb-40">
                <div data-scroll='shadow-movement' style={{
                  ['--shadow_color']:'var(--secondary)'
                }} className="bg_white text_black rounded-lg p-8">
                  <h3 className="text_black mb-2">Basic Plan</h3>
                  <p className="text_black">{plan.basicPlan.desc}</p>
                  <ul className="mt-4">
                    {plan.basicPlan.features.map(feature => (
                      <li key={feature} className="text_black text_1 marker_check"> {feature}</li>
                    ))}
                  </ul>
                  <Link  href={`order/${plan._id}?plan=basicPlan&sign=${toBuyToken}`} className="px-4 flex justify-between bg_secondary rounded-lg mt-12 py-4 hover:scale-90"><p className="text_white text_1">Buy for</p><p className="text_white text_1">{(convToCounCur(plan.basicPlan.price))}</p></Link>
                </div>

                <div data-scroll='shadow-movement' style={{
                  ['--shadow_color']:'var(--accent)'
                }} className="bg_white text_black rounded-lg p-8">
                  <h3 className="text_black mb-2">Standard Plan</h3>
                  <p className="text_black">{plan.standardPlan.desc}</p>
                  <ul className="mt-4">
                    {plan.standardPlan.features.map(feature => (
                      <li key={feature} className="text_black text_1 marker_check">{feature}</li>
                    ))}
                  </ul>
                  <Link href={`order/${plan._id}?plan=standardPlan&sign=${toBuyToken}`} className="px-4 flex justify-between bg_accent rounded-lg mt-12 py-4 hover:scale-90"><p className="text_white text_1">Buy for</p><p className="text_white text_1">{convToCounCur(plan.standardPlan.price)}</p></Link>
                </div>
              </div>
            </div>
          ))}
          </div>
        </section>
        </>
  )
}

export default Orderpage
