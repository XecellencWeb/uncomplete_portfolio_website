import { auth } from "../axios/defaults"
import { authBox } from "./box/authbox"
import { getCookie } from "./cookie"

export const redirectAdmin = async()=>{
    const userId = getCookie('userId')
    if(!userId) return true
    try {
        const {data} = await auth(`/auth/user/${userId}`)
        if(!data.isAdmin || !data.isBoss)return true
    } catch (err) {
        authBox(err.status,err.response.data)
    }
}