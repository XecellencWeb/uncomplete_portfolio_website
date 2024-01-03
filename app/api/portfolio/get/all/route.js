import Portfolio from "@models/portfolio"
import { connectMongo } from "@utils/dbconnect"

export const GET = async()=>{
    try {
        await connectMongo()
        const allPortfolio = await Portfolio.find().sort({createdAt:-1})

        return new Response(JSON.stringify(allPortfolio), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}