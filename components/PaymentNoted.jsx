'use client'
import { toBuyToken } from '@constants/tokens'
import { useSiteData } from '@context/siteData'
import useCurrency from '@hooks/useCurrency'
import { popup } from '@vanilla/box/popupbox'
import { postData } from '@vanilla/requests/post'
import { getSessionData } from '@vanilla/session'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const PaymentNoted = ({searchParams}) => {
    const navigate = useRouter()
    const {convToCounCur} = useCurrency()
    const sign = searchParams?.sign
    const paymentSuccessfull = searchParams.paymentsuccessful
    const {user} = useSiteData()
    const send = useRef(false)
    const emailSender = async(called)=>{
      if(called)return
      if(sent)return
      if(sign !== toBuyToken){
        return 
      }
      if(!paymentSuccessfull){
        try {
    

            await postData(`/api/mailer`,{to:user?.email,from:'josiahn234@gmail.com',fullName:'Josiah Newman',subject:'Your Payment was not Sucessfull',message:'The payment you just made was not successful. Please try purchasing again after some time. If this error keep recurring please contact me via this email or via my website or social media linked to my website.'})
            sent = true
            navigate.replace('/')
            } catch (err) {
            console.log(err)
          }
            return
        }
        
        try {
          const salesDetails = getSessionData(null,'sales_details')

          await postData(`/api/mailer`,{to:user?.email,from:'josiahn234@gmail.com',fullName:'Josiah Newman',subject:'Request Recieved',message:`Thanks for your purchase of ${salesDetails.name}. I will do my best to give you the best quality you need and in a short period of time. Details of service are listed thus 
          <ul style='list-style-type:none; padding-top:1rem'>
            <h3>Requirement Details</h3>
            <li>description: ${salesDetails.requirements.description}</li>
            <li>Require list: <ul style='list-style-type:none;'>${salesDetails.requirements.requireText?.forEach(text =>
              `<li>${text}</li>`
              ) || 'no required list'} </ul></li>
            <li>Asset Provided: ${salesDetails.requirements.assetStore.length}</li>
          </ul>
          <ul style='list-style-type:none; padding-top:1rem'>
            <h3>Service Details</h3>
            <li>Price: ${convToCounCur(salesDetails.price)}</li>
            <li>Type: ${salesDetails.type}</li>
            <li>Payment Made: ${salesDetails.paymentMade} payment made</li>
          </ul>
          `})
          
          await postData(`/api/sales/new`,salesDetails)

          await postData(`/api/mailer`,{to:'josiahn234@gmail.com',from:user?.email,fullName:user?.name || user?.fullName,subject:`${user?.name || user?.fullName} just made a purchase from your website.`,message:`${user?.name || user?.fullName} just made a purchase from your website please check your profile conversation to see full details of product`})
          sent = true
          popup({heading:'Success Transaction', text:`Your Transaction was successfull. I will take you along in the development process.Check your email for a message shortly.`})
          navigate.replace('/')
    
        } catch (err) {

          console.log(err)
        }
          

    }

  useEffect(()=>{
    send && user && emailSender()

    return ()=>{
      send.current = true
    }
  },[user])
}

export default PaymentNoted
