
'use client'

import { CallText, Images, ListItem } from '@app/profile/orders/pendingorders/[id]/page'
import { getPayment } from '@app/profile/orders/pendingorders/page'
import Loader from '@components/Loader'
import { colors } from '@constants/css'
import { pagepasskey } from '@constants/tokens'
import useCurrency from '@hooks/useCurrency'
import useFetch from '@hooks/useFetch'
import { formatDateToString } from '@vanilla/dataFormater'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Link from 'next/link'

const Receipt = ({params,searchParams}) => {
    const navigation = useRouter()
    const {data:receipt,loading} = useFetch(`/api/sales/get/${params.id}`)
    const {convToCounCur} = useCurrency()
    const passkey = searchParams.passkey








    useEffect(()=>{
        if(passkey !== pagepasskey)navigation.back()
    },[])









  return (
    loading ? (
        <Loader/>
    ):receipt &&
    <section className="flex flex-col">
      <div className="wrapper">
    <div className='mt-40 p-12 rounded-lg text_black bg_white'>
      <h1 className="mb-4">{receipt.name}</h1>
      <p className="mb-2">{receipt.requirements?.description}</p>
      <p className="">Payment Made: {getPayment(receipt) ? convToCounCur(receipt.price,getPayment(receipt)):'Payment will be made on completion.'}</p>

        <div className="mt-8">

      <CallText text='have this features'/>
      <ul className="list-disc">
        {receipt.requirements.requireText.length > 0? <ListItem>{receipt.requirements?.requireText}</ListItem>: (
            <p className="">No requirement listed</p>
            )}
      </ul>
         </div>
        
        <div className="mt-8">

      <CallText text='look like this'/>
      <p className="mb-4">Figma Link: <Link className='text_accent underline' href={receipt.requirements.link} target='_blank'>{receipt.requirements.link}</Link></p> 
      <div className="w-full">
        {receipt.requirements.assetStore.length > 0? <Images>{receipt.requirements.assetStore}</Images>: (
            <p className="">No Images Provided</p>
            )}
      </div>
        </div>
        <div className="mt-12">
          <p className="text_1">Project Started at {formatDateToString(receipt.createdAt)}</p>
          <p className="text_1">Project Finished at {formatDateToString(receipt.updatedAt)}</p>
        </div>
        <button onClick={()=>window.print()} className={`px-8 rounded-full mt-8 py-4 text_1 bg_primary hover:scale-110 hover:shadow-lg hover:shadow-[${colors.primary}] w-fit`}>Print</button>
    </div>
    </div>
    </section>
  )
}

export default Receipt
