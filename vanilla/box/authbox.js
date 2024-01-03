export const authBox = (status,message,timing)=>{
    const box = document.createElement('div')
    box.className = 'authbox--container'
    document.body.appendChild(box)

    box.innerHTML+=`
    <div class = 'authbox--status'>${status === 200?'😊':status === 401?'🤢':status === 400?'😡':status === 401?'😰':'🫨'} </div>
    <div class = 'authbox--message'>${message}</div>
    `


    setTimeout(()=>{
        box.style.opacity = '0'
        setTimeout(()=>{
            box.remove()
        },500)
    },timing || 5000)
}