import User from "@models/users"
import { hashpassword } from "@utils/bcrypt"
import { connectMongo } from "@utils/dbconnect"
import { signUser } from "@utils/signusers"

export const POST = async(req)=>{
    const {fullName,email,password:key,about,picture} = await req.json()
    const password = await hashpassword(key,10)
    try {
        await connectMongo()
        const signed = await User.create({
            fullName,email,password,about,picture
        })
        
        const user = await signUser(signed)

        return new Response(JSON.stringify(user), { status:200 })
        
    } catch (err) {
        console.log(err.response)
        return new Response(JSON.stringify(err),{status: err.status})
    }
}