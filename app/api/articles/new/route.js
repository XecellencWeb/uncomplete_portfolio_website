import Articles from "@models/articles"
import { connectMongo } from "@utils/dbconnect"

export const POST = async(req)=>{
    const value = await req.json()
    try {
        await connectMongo(),
        await Articles.create(value)


        return new Response(JSON.stringify('New article added Sucessfully'), {status:200})
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}