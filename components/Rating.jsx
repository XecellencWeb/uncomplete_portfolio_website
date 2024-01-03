'use client'

import React, { useEffect, useState } from 'react'
import {AiFillStar} from 'react-icons/ai'

const RatingOptions = [[5,true],[4,false],[3,false],[2,false],[1,false]]

const Rating = ({setRating,rating,size,className}) => {

const [ratingOptions,setRatingOptions] = useState(RatingOptions)

const selectRated = (index)=>{

    setRatingOptions(prev => prev.map((opt,indx)=>{
      if(index === indx){
        setRating(opt[0])
        return [opt[0],true]
      }

      return [opt[0],false]
    }))
}


useEffect(()=>{
  if(!rating)return
  setRatingOptions(prev => prev.map((opt)=>{
    if(opt[0] === rating){
      
      return [opt[0],true]
    }
    return [opt[0],false]
  }))

},[rating])

  return (
    <div className={`flex flex-row-reverse ${className}`}>
      {
        ratingOptions.map((opt,index) => (
          
             <AiFillStar key={index} onMouseOver={()=>setRating && selectRated(index)} onClick={()=>setRating && selectRated(index)} className={opt[1] && 'selected_rating'} fontSize={size}/>
      
        ))
      }
    </div>
  )
}

export default Rating
