import Sales from "@models/sales"
import { connectMongo } from "@utils/dbconnect"

export const GET = async(req,{params})=>{
    try {
        await connectMongo()
        const sale = await Sales.findById(params.id)
        return new Response(JSON.stringify(sale), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}