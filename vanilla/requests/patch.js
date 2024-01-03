export const patchData = async(url,data)=>{
    const response = await fetch(url,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })

    if(!response.ok){
        throw new Error('An error occured')
    }

    const result = await response.json()
    return result
}