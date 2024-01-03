export const postData = async(url,data)=>{


    
        const request = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!request.ok){
            const res = await request.json()
            throw new Error(res)
        }
        
        const result = await request.json()
        return result
    
}