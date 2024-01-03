export const togword = (element)=>{
        if(element.type === 'password'){
             element.type = 'text'
            return true
            }else{
                element.type = 'password'
                return false
            }

        
}