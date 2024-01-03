
import Articles from "@models/articles"
import { connectMongo } from "@utils/dbconnect"

export const GET = async (req,{params})=>{
    try {
        await connectMongo()
        const portfolio = await Articles.findById(params.id)

        return new Response(JSON.stringify(portfolio), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}