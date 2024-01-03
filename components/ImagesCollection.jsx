import React from 'react'
import OptimizedImg from './OptimizedImg'
import { removeSchema } from '@vanilla/react_utils/schema'

export const removeImage = (e,{index,callback})=>{
    e?.stopPropagation()

    removeSchema(index,callback)
}



const ImagesCollection = ({images,options}) => {
    const {editable=false,imageProps} = options
    const {src,className,callback,fit,...rest} = imageProps
  return (
    <div className="w-full">
    { 
    images?.map((image,index)=>(
        <div className={className || `inline-block mx-6 mb-6 rounded-lg overflow-clip peer relative`} key={index}>
            <OptimizedImg {...rest} src={image} style={{objectFit:fit || 'cover'}} />
            {editable && (
                <button className="h-40 w-40 rounded-full peer-hover:block hidden absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg_accent transition-all duration-[500ms]  hover:sace-110" onClick={(e)=>removeImage(e,{index,callback})}><span className="text-[2rem] text-white">x</span></button>
            )}
        </div>
    ))
    }
    </div>
  )
}

export default ImagesCollection
