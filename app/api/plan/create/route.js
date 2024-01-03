import Plan from "@models/plans"
import { connectMongo } from "@utils/dbconnect"

export const POST = async(req)=>{
    const data = await req.json()
    try {
        await connectMongo()
        await Plan.create(data)
        return new Response(JSON.stringify('Created Successfully'), {status:200})
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify(err), {status:err.status})
    }
}