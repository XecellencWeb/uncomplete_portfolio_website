const check = (item)=>{
    const top = item.getBoundingClientRect().top
      return (top + window.innerHeight <= window.innerHeight+500)
  }
  const loop = (item)=>{
    let i = 0
    while(i < item.length){
    if(check(item[i])) {
      item[i].style.transform = 'translateX(0)'
      const children = item[i].querySelectorAll('*')
      if(children.length > 0){
        for (let index = 0; index < children.length; index++) {
         children[index].style.transform = 'translateX(0)'
        }
      }
    }
    i++
    }
  }
export default function scroll (){
    const left = document.querySelectorAll('.left-right')
    const right = document.querySelectorAll('.right-left')
    loop(left)
    loop(right)
    }
