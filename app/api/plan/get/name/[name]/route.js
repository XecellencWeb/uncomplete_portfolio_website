import Plan from "@models/plans"
import { connectMongo } from "@utils/dbconnect"

export const GET = async(req,{params})=>{
    try {
        await connectMongo()
   
        const plans = await Plan.find({type:params.name})
        if(!plans){
            return new Response(JSON.stringify('Plan Not Found'), {status: 404})
        }
       
        return new Response(JSON.stringify(plans), {status: 200})
    } catch (err) {
        
        return new Response(JSON.stringify(err),{status:err.status || 500})
    }
}