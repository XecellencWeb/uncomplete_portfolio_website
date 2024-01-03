'use client'


import { useState } from 'react'


const IframeLoader = ({link,className,...rest}) => {
    // const [isLoaded,setIsLoaded] = useState(false)
  return (
    <div className={`skeleton_loader relative w-[min(100% - 3rem, 35rem)] h-[27rem] overflow-clip mt-2`}>
      <iframe className={`w-screen h-screen sm:scale-50  origin-top-left absolute top-0 left-0 border-none `}  src={link} {...rest}></iframe>
    </div>
  )
}

export default IframeLoader
