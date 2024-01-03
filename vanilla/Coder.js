export const deleteBackwardsCoder = (elem)=>{
    const target = elem.target
    const previousTarget = target.previousElementSibling
    if(elem.key === 'Backspace' && !target.value){
        if(previousTarget){
        previousTarget.value = ''
        previousTarget.focus()
        }
    }
}
export const onFocusedCoder = (elem)=>{
    const target = elem.target
    const targetNext = target.nextElementSibling
    if(targetNext){
    if(target.value.length > 0) targetNext.focus()
    }
}
export const updateCoder = (elem) =>{
    
    const nextElem = elem.nextElementSibling
    if(nextElem)elem.blur()
    if(nextElem)nextElem.focus()
    if(!nextElem && elem.value.length > 1){
        elem.value = elem.value.slice(0,1)
    }
}