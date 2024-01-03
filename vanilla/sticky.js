
console.log('Its working')

export default function sticky (){
    const stickyElement = document.querySelector('[data-type=sticky]')
    const top = stickyElement.getBoundingClientRect().top
    console.log(top)
    if(top < 1){
        stickyElement.className += ' sticky--js'
        console.log(top)
        console.log(stickyElement)
    }
}
