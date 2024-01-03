import Link from 'next/link'
import React from 'react'


export const flexVerticalClass  = 'flex flex-col items-center text-center '
export const cardStyle = 'p-20 rounded-lg bg_accent hover:scale-110'


const PortfolioHome = () => {
  return (
    <div className='flex flex-col gap-10 sm:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 pt-20 w-full'>
      <Link href='portfolios/add' className={flexVerticalClass+cardStyle}><i className="bi bi-cloud-plus text_7"></i> <p className="">Add to Portofolios</p></Link>
      <Link href='portfolios/all' className={flexVerticalClass+cardStyle}><i className="bi bi-collection-play-fill text_7"></i><p className="">View All Collections</p></Link>
    </div>
  )
}

export default PortfolioHome
