export const isempty = (object,{strict=false})=>{
    let i = 0
    const quantifier = []
    for(const key in object){
        if(object[key]?.toString()?.length === 0 ){
            quantifier.push(true)
        }else{
            quantifier.push(false)
        }
        i++
    }
    if(strict){
        if(quantifier.includes(true))return true 
    }
    if(quantifier.filter(value => value).length === i)return true
    return false

}

export function convertLcarmelToCapital(str) {
    // This part of the code replaces the first character of the string with its uppercase version.
    return str.replace(/^[a-z]/, (match) => match.toUpperCase())

    // This part of the code adds a space before every capital letter that follows a lowercase letter.
              .replace(/[a-z](?=[A-Z])/g, (match) => match + ' ')

    // This part of the code adds a space between a lowercase letter and a capital letter.
              .replace(/([a-z])([A-Z])/g, (match, first, second) => first + ' ' + second);
}