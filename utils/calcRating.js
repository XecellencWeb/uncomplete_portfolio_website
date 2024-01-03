export const calcRating = (array)=>{
    if(!array)return
    let sum = 0
    const totalRating = array.length
    // if(provided){
    //     for(const i of array){
    //         sum += i
    //     }

    // const rating = sum/totalRating
    // return rating
    // }

    for(const i of array){
        sum += i.rating
    }

    return sum/totalRating
}