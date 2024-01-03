let page = 0
let lastScroll = 0

export const customScroll = ()=>{

    const appearElement = document.querySelector('[data-scroll = appear]')
    const appearChildren = appearElement && Array.from(appearElement?.querySelectorAll('ul li'))

        oneTimeCall()
    const observer = new IntersectionObserver(entries => {

        if(!appearChildren || appearChildren.length === 0)return

        entries.forEach(entry => {
            if(entry.isIntersecting) {
               

                appearChildren?.forEach(child => {
                    child.classList.add('show_text')
                })
            }
            else{
                
                appearChildren?.forEach(child => {
                    child.classList.remove('show_text')
                })

            }
        })
    })

    appearElement && observer.observe(appearElement)
}

const oneTimeCall = ()=>{
    const htmlElement = document.documentElement
    
    const height = window.screen.height

    let top = window.scrollY

        let scrollposition =  Math.min((top/height * 100),100)

        htmlElement.style.setProperty('--scroll',scrollposition)

       

}


const isElementVisible = (el)=>{
    const rect = document.querySelector(el)?.getBoundingClientRect();
    return (
        (rect?.top + rect?.height) > window.innerHeight && 
        rect?.left > 0 && rect?.right > 0
    );
}

// Example usage:



let customvalue = 0

export const customScrollSetter = ()=>{
  oneTimeCall()
  const newScroll = window.scrollY - lastScroll
  if(window.scrollY === 0 || customvalue < 0 || isElementVisible('[data-scroll = shadow-movement]') ){
    customvalue = 0
    document.documentElement.style.setProperty('--custom-scroll',customvalue)
    return
}
  
  if(newScroll > 0){
      customvalue += 2
    }else{
        customvalue -= 2
    }
    
    const customScrol = Math.min(customvalue, 100)
    
    document.documentElement.style.setProperty('--custom-scroll', customScrol)
   

    lastScroll = window.scrollY
}



export const animeInsert = (anime,time,elem)=>{
    
        
    
    
    const Elem = document.querySelector(elem)
    if(page != time){
        Elem?.classList.remove(anime)
        Elem?.classList.add('off')
        return
    }
    Elem?.classList.remove('off')
    Elem?.classList.add(anime)
    

}
