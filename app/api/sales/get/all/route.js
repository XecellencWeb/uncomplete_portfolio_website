import Sales from "@models/sales"
import { connectMongo } from "@utils/dbconnect"

export const GET = async()=>{
    try {
        await connectMongo()
        const allSales = await Sales.find({done:false})
        return new Response(JSON.stringify(allSales), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}