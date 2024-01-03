'use client'


import { getPayment } from '@app/profile/orders/pendingorders/page'
import useCurrency from '@hooks/useCurrency'
import useFetch from '@hooks/useFetch'
import { formatDateToString } from '@vanilla/dataFormater'
import React from 'react'
import Link from 'next/link'
import { pagepasskey } from '@constants/tokens'

const AllReceipts = () => {
const{data:allReceipts} = useFetch(`/api/sales/get/receipts`)
const {curInEur} = useCurrency()
    return (
        <section className='flex'>
            <div className=" wrapper flex flex-col gap-5 mt-40">

            {
                allReceipts?.map((receipt)=>(
                    <Link href={`receipts/${receipt._id}?passkey=${pagepasskey}`} key={receipt._id} className="bg_white text_black block hover:scale-90 rounded-lg p-12 shadow-lg shadow-gray-400 dark:shadow-none">
                        <h3 className="mb-2">{receipt.name}</h3>
                        <p className="mb-4 t_view_less">{receipt.requirements.description}</p>
                        <p className="">Payment Made: {getPayment(receipt) ? curInEur(receipt.price,getPayment(receipt)):'Payment will be made on completion.'}</p>
                        <div className="flex justify-between mt-6 text-base"><p className="text-base">Started:{formatDateToString(receipt.createdAt)}</p>
                        <p className="text-base">Ended:{formatDateToString(receipt.updatedAt)}</p></div>
                    </Link>
                ))
            }

            </div>
        </section>
      )
}

export default AllReceipts
