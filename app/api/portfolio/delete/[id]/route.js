import Portfolio from "@models/portfolio"
import { connectMongo } from "@utils/dbconnect"

export const DELETE = async(req,{params})=>{
    try {
        await connectMongo()
        await Portfolio.findByIdAndDelete(params.id)

        return new Response(JSON.stringify('portfolio deleted successfully'), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}