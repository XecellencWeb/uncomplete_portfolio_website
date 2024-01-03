import Plan from "@models/plans"
import { connectMongo } from "@utils/dbconnect"


export const PATCH = async(req,{params})=>{
    const With = await req.json()
    try {
        await connectMongo()

        await Plan.findByIdAndUpdate(params.id,With,{new:true})
        return new Response(JSON.stringify('Update was Sucessfull'), {status:200})

    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status})
    }
}