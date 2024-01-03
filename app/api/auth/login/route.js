import User from "@models/users"
import { signUser } from "@utils/signusers"
import { compare } from "bcryptjs"

export const POST = async(req)=>{
    const {email,password} = await req.json()

    try {
        const exist = await User.findOne({email})
        if(!exist) return new Response(JSON.stringify('User does not exist in Server'), {status:404})
        if(!compare(password,exist.password))return new Response(JSON.stringify('The password entered is incorrect'), {status:401})
        const user = await signUser(exist)

        return new Response(JSON.stringify(user), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err.message), {status:err.status})
    }
}