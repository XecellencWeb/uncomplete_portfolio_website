import React, { useState } from 'react'
import Image from 'next/image'

const OptimizedImg = ({className,...rest}) => {
    const [imgReady,setImgReady] = useState(false)
  return (
    <Image {...rest} className={className + `${!imgReady && 'hidden'}`} width={width} height = {height} onLoad={()=>setImgReady(true)}/>
  )
}

export default OptimizedImg
