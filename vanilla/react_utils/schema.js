export const removeSchema = (index,callback)=>{
    callback(prev => prev.filter((_,ind)=>index !== ind)) 
}

export const addSchema = (e,callback,{subsets,addOnEnterKey=false})=>{
    if(addOnEnterKey){
        if(e.key !== 'Enter')return
    }
    callback(prev => [...prev,e.target.value])
    if(!subsets || subsets.length === 0) return
    subsets.forEach(subset => {
        subset(prev => [...prev,e.target.value])
    });
}

export const addOnEnterKey = (e,callback)=>{
    if(e.key !== 'Enter')return
    addSchema(e,callback)
}