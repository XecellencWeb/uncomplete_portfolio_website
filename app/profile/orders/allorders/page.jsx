'use client'

import { useSiteData } from '@context/siteData'
import Link from 'next/link'
import React from 'react'

function page() {
    const {planData} = useSiteData()
  
    return (
        planData?.loading
        ?<p>loading....</p>
        :planData?.err
        ?<p>An Err Occured</p>
        :planData?.data?.map(plan=>{
            return <Link href={plan._id} key={plan._id} className="mt-8 flex flex-col sm:grid sm:grid-cols-2 gap-10 bg_white rounded-lg p-12 shadow-lg shadow-slate-400 hover:scale-90">
                <div className="flex flex-col justify-between">
                    <h3 className="text_black">
                        {plan.name}
                    </h3>
                    <p className="text_black">
                        Starting at {(plan.basicPlan.price/100).toLocaleString('en-US',{style: 'currency', currency:'USD'})}
                    </p>
                </div>
                <div className="">
                    <p className="text-right text_black t_view_less">{
                        plan.desc
                    }</p>
                </div>
            </Link>
        }))
}

export default page
