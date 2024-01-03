import { auth } from "../../axios/defaults"
import { authBox } from "../authbox"
import { getCookie } from "../cookie"

export const unmakeAdmin = async(id)=>{
    authBox(102)
    const userId = getCookie('userId')
    const token = getCookie('access_token')
    try {
        const {data} = await auth(`/auth/user/${userId}/${token}`)
        if(!data.isBoss) return authBox(401,'Only Boss can unmake admin')
        try {
            await auth.put(`/auth/user/${id}/${token}`,{isAdmin:false})
            authBox(200,'Successfull Request.')
        } catch (err) {
            authBox(err.status,err.response.data)
        }
    } catch (err) {
        authBox(err.status,err.response.data)
    }
}