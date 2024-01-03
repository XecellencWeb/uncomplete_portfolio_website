

export default function top(element){
    console.log(element)
    const scrollY = window.scrollY
    const height = window.innerHeight
    console.log(height)
    console.log(scrollY)

    if(scrollY > height){
        element.className += ' visible'
    }else{
        element.className.replace('visible','hidden')
    }
}