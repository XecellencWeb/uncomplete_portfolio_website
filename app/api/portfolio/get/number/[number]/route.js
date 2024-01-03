import Portfolio from "@models/portfolio"
import { connectMongo } from "@utils/dbconnect"

export const GET = async(req,{params})=>{
    const number = JSON.parse(params.number)

    try {
        await connectMongo()
        const portfolios = await Portfolio.find().sort({createdAt: -1}).limit(number)

        return new Response(JSON.stringify(portfolios), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}