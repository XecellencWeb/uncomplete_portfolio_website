const RanNoGen = []

export function generate (length){
    let i = 0
    while(i < length){
        RanNoGen[i] = Math.floor(Math.random() * 9)
        i++
    }
    return RanNoGen
}