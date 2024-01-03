import { auth } from "../../axios/defaults"
import { authBox } from "../authbox"
import { getCookie } from "../cookie"


export const makeAdmin = async(id,name)=>{
    authBox(102)
    const userId = getCookie('userId')
    const token = getCookie('access_token')

    if(!userId) return authBox(400,'you are not logged in')
    try {
        const user = await auth(`/auth/user/${userId}/${token}`)
    if(!user.data.isAdmin)return authBox(401,'you are not an admin')
    await auth.put(`/auth/updateuser/${id}`,{isAdmin:true})
    authBox(200,`${name} now Admin`)
    } catch (err) {
        authBox(err.status,err.response.data)
    }
    
}

export const deleteUser = async(id,name)=>{
    authBox(102)
    const userId = getCookie('userId')
    const token = getCookie('access_token')
    if(!userId) return authBox(400,'you are not logged in')
    try {
        const user = await auth(`/auth/user/${userId}/${token}`)
        if(!user.data.isAdmin)return authBox(401,'you are not an admin')
        await auth.delete(`/auth/user/${id}/${token}`)
        authBox(200,`${name} now Deleted`)
    } catch (err) {
        authBox(err.status,err.response.data)
    }
    
}