
export const offPages = ()=>{
const pages = document.querySelectorAll('[data-section = true]')
let i = 0
while(i < pages.length){
    pages[i].checked = true
    i++
}
}



export const NavigateToSection = async(type,e)=>{
    e?.stopPropagation()
    e?.preventDefault()
 
offPages()
if(!type)return offPages()
    const page = document.querySelector(`[data-type=${type}]`)
    page.checked = false
    
}


export const optOut = (e,controller)=>{
    const clicked = e.target
    const isParent = (clicked.getAttribute('data-type')) === 'parent'

    if(isParent)controller.current.checked = true
}