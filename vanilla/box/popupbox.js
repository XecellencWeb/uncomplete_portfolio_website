import { resolve } from "styled-jsx/css"

const removePopup = `
    const popup = document.getElementById("popup-container")
    popup.remove()
`



export const popup = (options)=>{
    const popup = document.createElement('div')
    const popupbox = document.createElement('div')
    let selectedOption = {}
    
    document.body.appendChild(popup)
    popup.appendChild(popupbox)

    popup.id = 'popup-container'
    popup.className = 'popup--container'
    popupbox.className = 'popup--box'
    
    
    popupbox.innerHTML += `
    <button class='popup--close' onClick='${removePopup}'>x</button>
    ${options.heading ? `<h1 class='popup--heading'>${options.heading}</h1>`: ''}
    <p class='popup--text'>${options?.text}</p>
    `
    

    if(!options.type) return
    if(options?.type === 'confirm'){

        return new Promise((resolve, reject) => {

        const option = document.createElement('div')
        option.className = 'popup--options'
        const yesOption = document.createElement('button')
        const noOption = document.createElement('button')

        yesOption.textContent = 'Yes'
        noOption.textContent = 'No'

        popupbox.appendChild(option)
        option.appendChild(yesOption)
        option.appendChild(noOption)

        yesOption.onclick = ()=>{
            popup.remove()
            selectedOption = {
                yes:true
            }
            resolve(selectedOption)
        }
        noOption.onclick = ()=>{
            popup.remove()
            selectedOption = {
                yes:false
            }
            reject(selectedOption)
        }

            
        })
            
    }


    if(options?.type === 'prompt'){

        return new Promise((resolve,reject)=>{
            const inputCont = document.createElement('div')
            inputCont.className = 'popup--input_container'
            const input  = document.createElement('input')
            input.type = 'text'
            input.className = 'popup--input'
            const inputBtn = document.createElement('button')
            inputBtn.className = 'popup--input_btn'

            inputBtn.textContent = 'submit'
            inputCont.appendChild(input)
            inputCont.appendChild(inputBtn)

            popupbox.appendChild(inputCont)
            inputBtn.onclick = ()=>{
                popup.remove()
                if(input.value)resolve(input.value)
                reject(input.value)
                
            }
        })

    }
}