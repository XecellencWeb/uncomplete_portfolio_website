import Portfolio from "@models/portfolio"
import { connectMongo } from "@utils/dbconnect"

export const GET = async (req,{params})=>{
    try {
        await connectMongo()
        const portfolio = await Portfolio.findById(params.id)

        return new Response(JSON.stringify(portfolio), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}