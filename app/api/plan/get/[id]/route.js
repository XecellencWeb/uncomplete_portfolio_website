import Plan from "@models/plans"
import { connectMongo } from "@utils/dbconnect"

export const GET = async(req, {params})=>{
    try {
        await connectMongo()
        const plan = await Plan.findById(params.id)
        return new Response(JSON.stringify(plan), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status})
    }
}