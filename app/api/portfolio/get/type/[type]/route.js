import Portfolio from "@models/portfolio"
import { connectMongo } from "@utils/dbconnect"

export const GET = async(req,{params})=>{
    try {
        await connectMongo()
        const portfolios = await Portfolio.find({type:params.type}).sort({createdAt: -1})

        return new Response(JSON.stringify(portfolios), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}