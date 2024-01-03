'use client'

import { UploadBox } from '@components'
import { toBuyToken } from '@constants/tokens'
import useFetch from '@hooks/useFetch'
import { useRouter } from 'next/navigation'
import React, { createRef, useEffect, useState } from 'react'
import { addSchema, removeSchema } from '@vanilla/react_utils/schema'
import { postData } from '@vanilla/requests/post'
import useCurrency from '@hooks/useCurrency'
import { convertLcarmelToCapital } from '@vanilla/objects_methods/isempty'
import { authBox } from '@vanilla/box/authbox'
import { popup } from '@vanilla/box/popupbox'
import { storeSession } from '@vanilla/session'
import Link from 'next/link'
import { useSiteData } from '@context/siteData'
import Loader from '@components/Loader'
import OptimizedImg from '@components/OptimizedImg'






const PlanWanted = ({params,searchParams}) => {
    const {convToCounCur} = useCurrency()
    const {user} = useSiteData()

    const navigate = useRouter()
    const {data:plan,loading} = useFetch(`/api/plan/get/${params?.id}`)
    const planName = searchParams?.plan
    const sign = searchParams?.sign
    const [assetStore, setAssetStore] = useState([])
    const [requireText, setRequireText] = useState([])
    const [userCritarial,figma] = [createRef(),createRef()]
    const [isLoading,setIsLoading] = useState(false)
 






    const checkSubmitValidity = ()=>{
        return (
            userCritarial.current.value || figma.current.value || requireText.length > 0 || assetStore.length > 0 
        )
    }











    useEffect(()=>{
            if(sign !== toBuyToken){
                navigate.back()
            }
    },[])

    const appendAsset = (name,asset)=>{
        setAssetStore(prev => [...prev,asset])
    }


    const buyProduct = async(amount)=>{
        if(!user) return popup({heading:'You must Login In to continue',text:'We are sorry, We cannot complete your request sir until you login.'})
        if(!checkSubmitValidity())return authBox(400,'You must Provide at least one Requirement')
        setIsLoading(true)

        const salesDetails = {
            name: plan?.name,
            type: convertLcarmelToCapital(planName),
            price:plan && plan[planName]?.price,
            paymentMade: 'No',
            requirements:{
                description: userCritarial.current.value || plan?.desc,
                link: figma.current.value,
                requireText,
                assetStore
            },
            userInfo:{email:user?.email,fullName:user?.name || user?.fullName}
        }
        if(!amount){
            try {
                await postData(`/api/sales/new`,salesDetails)
                popup({
                    heading:'Successfull Purchase',
                    text:'Your request has been recieved, your application shall be designed and we will get back to yoou immediately.'
            })
            } catch (err) {
                console.log(err)
                authBox(err.status,'An error Occured')
            }finally{
                setIsLoading(false)
            }
            return
        }
  
        salesDetails.paymentMade = amount 
        storeSession(salesDetails,'sales_details')
        
        try {
          const result =  await(await fetch(`/api/payment/plan/${params.id}/${planName}/${amount}`)).json()
          console.log('sent')
          console.log(result)
            navigate.push(result.url)
        } catch (err) {
            console.log(err.status,err)
        }finally{
            setIsLoading(false)
        }
        
    }

  return (
    <div>
        <div className="head_wrapper my-20 bg-white dark:bg-slate-700 py-10 rounded-lg text_rev shadow-lg shadow-slate-300 dark:shadow-none">
            {
            loading
            ?<Loader/>
            :<div className="wrapper  px-10">
                <Link href='/order' className='text_7'>&larr;</Link>
                <div className="text_1 w-full flex flex-col">
                <h2 className="mb-2 font-bold">{plan?.name}</h2>
                <p className="mb-4">{plan?.desc}</p>
                <h3 className="font-bold">{convertLcarmelToCapital(planName)}</h3>
                <p className="mb-2">{plan && plan[planName]?.desc}</p>
                <p className="mb-8 font-bold">{plan && convToCounCur(plan[planName]?.price)}</p>
                <h3 className="font-semibold">Enter Your Requirements:</h3>
                <textarea className='resize-none h-40 rounded-lg mt-2 mb-4 p-4' ref={userCritarial} placeholder='Write about the application...'/>

                <div className="w-fit">{assetStore?.map((asset,index) => (
                    <div key={index} className="relative inline-block mx-2">
                        <OptimizedImg src={asset} width={50} height={50}/>
                        <button type='button' className='absolute rounded-full bg-slate-50 w-8 h-8 flex justify-center items-center shadow-sm top-0 right-0 translate-x-1/2 -translate-y-1/2' onClick={()=>removeSchema(index,setAssetStore)}><span>x</span></button>
                        </div>
                ))}</div>
                <UploadBox dragText='Drag and Drop wireframes or designs here to upload ' accept='image' setAsset={appendAsset} setUploaded={false}/>
                <p className="">or</p>
                <input ref={figma} className='rounded-lg p-4 h-16' type="text" placeholder='Insert your Figma link here'/>
                <p className="">or</p>
                <div className="w-fit mb-2">
                    {requireText?.map((text,index)=>(
                        <div key={index} className="relative bg_primary px-4 inline-block mx-2">
                            <p className="">{text}</p>
                            <button type='button' onClick={()=>removeSchema(index,setRequireText)} className="absolute rounded-full bg-slate-50 w-8 h-8 shadow-sm top-0 right-0 translate-x-1/2 -translate-y-1/2 flex justify-center items-center"><span className="">x</span></button>
                        </div>
                    ))}
                </div>
                <input className='rounded-lg p-4 h-16' type="text" placeholder='Enter requirements manually' onKeyDown={(e)=>addSchema(e,setRequireText,{addOnEnterKey:true})}  />
                {
                    isLoading? (
                        <Loader/>
                    ):(
                    <>
                <button onClick={()=>buyProduct()} className="bg_primary flex justify-center items-center gap-10 mb-2 rounded-lg h-12 mt-40"><p className="text_1">Make Payment after Completion</p></button>

                <button onClick={()=>buyProduct('half')} className="bg_secondary flex justify-center items-center gap-10 mb-2 rounded-lg h-12"><p className="text_1">Make Half Payment</p><p className="text_1">{plan && convToCounCur(plan[planName]?.price,.5)}</p></button>

                <button onClick={()=>buyProduct('full')} className="bg_accent flex justify-center items-center gap-10 mb-2 rounded-lg h-12"><p className="text_1">Buy for</p><p className="text_1">{plan && convToCounCur(plan[planName]?.price)}</p></button>
                </>
                    )
                }
            </div>
            </div>
            }
        </div>
      
    </div>
  )
}

export default PlanWanted
