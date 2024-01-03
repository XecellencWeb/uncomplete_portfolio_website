import Plan from "@models/plans"
import { connectMongo } from "@utils/dbconnect"

export const GET = async(req)=>{
    try {

        await connectMongo()
        const allPlans = await Plan.find()
        return new Response(JSON.stringify(allPlans), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status})
    }
}