'use client'
import { useSiteContent } from '@context/siteContent'
import { authBox } from '@vanilla/box/authbox'
import { preventEnter } from '@vanilla/prevenDefauts'
import { addOnEnterKey, removeSchema } from '@vanilla/react_utils/schema'
import { postData } from '@vanilla/requests/post'
import React, { createRef, useEffect, useRef, useState } from 'react'

function Page() {
    const {content:josiah} = useSiteContent()
    const [featuresArr,setFeaturesArr] = useState([])
    const [stanFeaArr,setStanFeaArr] = useState([])
    const [selectSer, setSelectSer] = useState()
    const [creating,setCreating] = useState(false)
    const gigName = useRef()
    const [basicPrice,basicDesc] = [createRef(),createRef()]
    const [stanPrice,stanDesc] = [createRef(),createRef()]
    const planDesc = useRef()

    useEffect(()=>{
        setStanFeaArr(prev => [...prev,featuresArr[featuresArr.length - 1]])
    },[featuresArr])


const sumbitForm = async(e)=>{
    e.preventDefault()
    setCreating(true)
    const data = {
        name:gigName.current.value,
        desc:planDesc.current.value,
        type:selectSer,
        basicPlan:{
            desc:basicDesc.current.value,
            price:parseFloat(basicPrice.current.value) * 100,
            features:featuresArr
        },
        standardPlan:{
            desc:stanDesc.current.value,
            price:parseFloat(stanPrice.current.value) * 100,
            features:stanFeaArr
        }
    }

    try {
        await postData(`/api/plan/create`,data)
        authBox(200, 'Plan successfully added')
    } catch (err) {
        authBox(err.status, 'Something went Wrong')
    }finally{
        setCreating(false)
    }
    
}
    
  return (
    <section className="">
        <div className="wrapper">
            <form onKeyDown={preventEnter} onSubmit={sumbitForm} className="w-full pt-8">
                <input ref={gigName} type="text" placeholder='Enter Name of Plan here......' className="p-4 mb-2 w-full rounded-lg" />
                <textarea ref={planDesc} placeholder='Briefly Describe plan.....' className="p-4 resize-none w-full h-24 rounded-lg"/>
                <select onChange={(e)=>setSelectSer(e.target.value)} className="p-4 rounded-lg">
                    <option className='py-2 px-4' value="">Type of Service</option>
                    {josiah?.skills.map((skill,index)=>{
                        return <option className='py-2 px-4' key={index} value={skill.name}>{skill.name}</option>
                    })}
                </select>

                {
                    !selectSer
                    ?<div className="w-full mt-12 h-96 grid place-content-center rounded-lg border-2 border-solid opacity-60">
                        <p className="">Please Select a Service to Proceed</p>
                    </div>
                    :<>
        <div className="my-12 w-full">
                    <h3 className="mb-2">Fill Out Basic Plan Features</h3>
                <div className="w-full flex gap-3">
                    <textarea ref={basicDesc} placeholder='Describe Basic plan.....' className="p-4 resize-none w-full h-24 rounded-lg"/>
                    <input ref={basicPrice} placeholder='Enter price in Dollars....' type="number" className="p-4 w-56 h-16 rounded-lg" />
                </div>

        <div className="mt-2 flex flex-col rounded-lg p-4 border-2 border-solid w_sm">
        <div className="">
              {
                featuresArr?.map((feature,index)=><div key={index} className='inline-block w-fit px-2 py-1 rounded-sm bg_secondary mr-2 mb-2 relative'>
                  <span>{feature}</span>
                <button type='button' onClick={()=>{removeSchema(index,setFeaturesArr)}} className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full flex justify-center items-center h-6 w-6 text_1 bg-slate-100  border-2' ><span className='text-gray-700'>x</span></button>
                </div>)
              }
          </div>
              <input type='text' onKeyDown={(e)=>addOnEnterKey(e,setFeaturesArr)} placeholder='Input Features of Basic Plan.......'  style={{
                appearance:'none',
                MozAppearance: 'none',
                padding:'.5rem',
                background: 'transparent',
                outline:'none'
              }} />
            
        </div>
                </div>


                <div className="my-12 w-full">
                    <h3 className="mb-2">Fill Out Standard Plan Features</h3>
                <div className="w-full flex gap-3">
                    <textarea ref={stanDesc} placeholder='Describe Standard plan.....' className="p-4 resize-none w-full h-24 rounded-lg"/>
                    <input ref={stanPrice} placeholder='Enter price in Dollar....' type="number" className="p-4 w-56 h-16 rounded-lg" />
                </div>

        <div className="mt-2 flex flex-col rounded-lg p-4 border-2 border-solid w_sm">
        <div className="">
              {
                stanFeaArr?.map((feature,index)=><div key={index} className='inline-block w-fit px-2 py-1 rounded-sm bg_secondary mr-2 mb-2 relative'>
                  <span>{feature}</span>
                <button type='button' onClick={()=>removeSchema(index,setStanFeaArr)} className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full flex justify-center items-center h-6 w-6 text_1 bg-slate-100  border-2' ><span className='text-gray-700'>x</span></button>
                </div>)
              }
          </div>
              <input type='text' onKeyDown={(e)=>{addOnEnterKey(e,setStanFeaArr)}} placeholder='Input Features of Standard Plan.......'  style={{
                appearance:'none',
                MozAppearance: 'none',
                padding:'.5rem',
                background: 'transparent',
                outline:'none'
              }} />
            
        </div>
                </div>
                <button disabled={creating} type='submit' className="h_secondary">{creating?'Creating...':'Create'}</button>
                </>

}
            </form>
        </div>
    </section>
  )
}

export default Page
