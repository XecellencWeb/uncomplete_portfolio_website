import Sales from "@models/sales"
import { connectMongo } from "@utils/dbconnect"



export const POST = async(req)=>{
    const newSale = await req.json()
    try {
        await connectMongo()
        await Sales.create(newSale)

        return new Response(JSON.stringify('Successfull'), {status:200})
    } catch (error) {
        return new Response(JSON.stringify(error), {status:error.status || 500})
    }
}