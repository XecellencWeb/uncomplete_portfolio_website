'use client'

import useCurrency from '@hooks/useCurrency'
import useFetch from '@hooks/useFetch'
import React from 'react'
import Link from 'next/link'


export const getPayment = (sale)=>{
    const payment = sale.paymentMade.toLowerCase()

    const missingValue = payment === 'full' ? 1 : payment === 'half' ? 0.5 : null
    return missingValue
}




const PendingOrder = () => {
    const {data:allSales} = useFetch(`/api/sales/get/all`)
    const {curInEur} = useCurrency()
  return (
    <div className='flex flex-col gap-5 pt-40 relative'>
        <Link className='absolute top-0 right-0 mt-4 block h_secondary text_white' href='/receipts'>View completed Tasks</Link>
        {
            allSales?.map((sale)=>(
                <Link href={`pendingorders/${sale._id}`} key={sale._id} className="bg_accent text_white hover:scale-90 rounded-lg p-12 ">
                    <h3 className="mb-2">{sale.name}</h3>
                    <p className="mb-4 t_view_less">{sale.requirements.description}</p>
                    <p className="">Payment Made: {getPayment(sale) ? curInEur(sale.price,getPayment(sale)):'Payment will be made on completion.'}</p>
                </Link>
            ))
        }
    </div>
  )
}

export default PendingOrder
