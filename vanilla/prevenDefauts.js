export const preventEnter = (e)=>{
    if(e.key !== 'Enter')return
    e.preventDefault()
}