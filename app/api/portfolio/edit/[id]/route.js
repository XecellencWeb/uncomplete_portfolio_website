import Portfolio from "@models/portfolio"
import { connectMongo } from "@utils/dbconnect"

export const PATCH = async (req,{params})=>{
    const changesMade = await req.json()
    try {
        await connectMongo()
        await Portfolio.findByIdAndUpdate(params.id,changesMade)

        return new Response(JSON.stringify('Successful  Update'), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}