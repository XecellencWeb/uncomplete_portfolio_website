import Portfolio from "@models/portfolio"
import { connectMongo } from "@utils/dbconnect"

export const POST = async (req)=>{
    const newPortfolio = await req.json()
    
    try {
        await connectMongo()
        await Portfolio.create(newPortfolio)

        return new Response(JSON.stringify('Successfull'), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
    
} 