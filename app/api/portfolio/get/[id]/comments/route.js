import Portfolio from "@models/portfolio"
import { connectMongo } from "@utils/dbconnect"

export const GET = async(req,{params})=>{
    try {
        await connectMongo()

        const portfolio = await Portfolio.findById(params.id)
        const comments = portfolio.comments.sort((a,b)=> b.createdAt - a.createdAt)

        return new Response(JSON.stringify(comments), {status:200})
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}