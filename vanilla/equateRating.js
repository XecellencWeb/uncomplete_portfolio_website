import { getCookie } from "./cookie"

export const calcRate = (rating)=>{
    if(!rating)return
    const rateNo = rating.length
    let sum = 0
    let i=0
    while(i< rateNo){
        sum += rating[i].rated
        i++
    }
    const rated = Math.round(sum/rateNo)
    return rated
}

export const getLike = (like)=>{
    if(!like)return
    const id = getCookie('userId')
    const Like = like.find(lik => lik.userId === id)
   if(Like)return Like.liked
   //return false
}