import React from 'react'
import Link from 'next/link'


function Page() {
  return (
    <section className="">
        <div className="wrapper">
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mx-auto">
                <Link href='orders/createorder' className="bg_accent hover:opacity-30 rounded-lg p-8 m-2 mt-8 flex flex-col gap-2 items-center"><i className ="bi text-3xl bi-plus"></i><span className="">Create Order</span></Link>
                <Link href='orders/allorders' className="bg_accent hover:opacity-30 rounded-lg p-8 m-2 mt-8 flex flex-col gap-2 items-center"><i className ="bi text-3xl bi-suitcase-lg-fill"></i><span className="">All Orders</span></Link>
                <Link href='orders/pendingorders' className="bg_accent hover:opacity-30 rounded-lg p-8 m-2 mt-8 flex flex-col gap-2 items-center"><i className ="bi text-3xl bi-stack"></i><span className="">Pending Orders</span></Link>
            </div>
        </div>
    </section>
  )
}

export default Page
