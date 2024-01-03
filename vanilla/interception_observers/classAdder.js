const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 1.0, // Call the callback when the target is 100% visible
  };


export const animateAT = (selector,{styles})=>{
    const elem = document.querySelector(selector)
    const observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(!entry.isIntersecting){
                styles?.forEach(style=>{
                    elem?.classList.remove(style)
                })
                return
            }

            styles?.forEach(style=>{
                elem?.classList.add(style)
            })
        })
    },options)


    observer.observe(elem)
}