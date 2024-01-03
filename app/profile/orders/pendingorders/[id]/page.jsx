'use client'


import useFetch from '@hooks/useFetch'
import React, { useState } from 'react'
import { getPayment } from '../page'
import OptimizedImg from '@components/OptimizedImg'
import Link from 'next/link'
import useCurrency from '@hooks/useCurrency'
import { colors } from '@constants/css'
import { popup } from '@vanilla/box/popupbox'
import { patchData } from '@vanilla/requests/patch'
import { authBox } from '@vanilla/box/authbox'
import Loader from '@components/Loader'


export const CallText = ({text})=>(
    <p className="">I need my application to {text}</p>
)

export const ListItem =  ({children})=>(
    children.map((list,index) => (
        <li key={list+index} className=''>{list}</li>
    ))
 )

export const Images = ({children})=>(
    children.map((image,index) => (
        <Link className='inline-block px-4 hover:scale-90' href={image} target='_blank'><OptimizedImg  key={image+index} src={image} width={100} height={100}/></Link>
    ))
 ) 


const Sale = ({params}) => {
    const {data:sale} = useFetch(`/api/sales/get/${params.id}`)
    const {curInEur} = useCurrency()
    const [isLoading,setIsLoading] = useState()




console.log(sale)

  const completeSale = async()=>{
    const paymentMade = sale.paymentMade.toLowerCase()

    const appUrl = await popup({
      heading:'Enter User Acess Informations',
      text:'Appplication Url',
      type:'prompt'
    })
    console.log(appUrl)
    if(!appUrl)return

    const urlText = `Visit <a href='${appUrl}'>this Link</a> to view your website. `

    if(paymentMade === 'no' || paymentMade === 'half'){
      let keyWord = 'Make'
      const extraInfo = `${keyWord} your payment to get access to application`

      if(paymentMade === 'half'){
        keyWord = 'Complete'
      }

      setIsLoading(true)

      try {
        await patchData(`/api/sales/new/receipts/${params.id}`,{
          userEmail:sale.userInfo.email,
          extraInfo: urlText + extraInfo
        })
        authBox(200,'Successfull request')
      } catch (err) {
        console.log(err)
      }finally{
        setIsLoading(false)
      }

      return

    }
      const Username = await popup({
        heading:'Enter User Acess Informations',
        text:'Username',
        type:'prompt'
      })
      if(!Username)return
      const Password = await popup({
        heading:'Enter User Acess Informations',
        text:'Password',
        type:'prompt'
      })
      if(!Password)return
      setIsLoading(true)
      try {
        await patchData(`/api/sales/new/receipts/${params.id}`,{
          userEmail:sale.userInfo.email,
          extraInfo:`${urlText}Your username is ${Username} and password is ${Password} `
        })
        authBox(200,'Successfull request')
      } catch (err) {
        console.log(err)
      }finally{
        setIsLoading(false)
      }
  }

















  return (
    sale 
    &&
    <div className='mt-12'>
      <h1 className="mb-4">{sale?.name}</h1>
      <p className="mb-2">{sale?.requirements?.description}</p>
      <p className="">Payment Made: {getPayment(sale) ? curInEur(sale?.price,getPayment(sale)):'Payment will be made on completion.'}</p>

        <div className="mt-8">

      <CallText text='have this features'/>
      <ul className="list-disc">
        {sale.requirements.requireText.length > 0? <ListItem>{sale?.requirements?.requireText}</ListItem>: (
            <p className="">No requirement listed</p>
            )}
      </ul>
         </div>
        
        <div className="mt-8">

      <CallText text='look like this'/>
      <p className="mb-4">Figma Link: <Link className='text_accent underline' href={sale.requirements.link} target='_blank'>{sale.requirements.link}</Link></p> 
      <div className="w-full">
        {sale.requirements.assetStore.length > 0? <Images>{sale.requirements.assetStore}</Images>: (
            <p className="">No Images Provided</p>
            )}
      </div>
        </div>
        
        {isLoading?<Loader/>:<button onClick={completeSale} className={`px-8 py-4 mt-12 text_1 bg_primary hover:scale-110 hover:shadow-lg hover:shadow-[${colors.primary}] w-fit`}>Done With Application</button>}
    </div>
  )
}

export default Sale
