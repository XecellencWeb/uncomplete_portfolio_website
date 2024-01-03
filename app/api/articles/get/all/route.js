
import Articles from "@models/articles"
import { connectMongo } from "@utils/dbconnect"

export const GET = async()=>{
    try {
        await connectMongo()
        const allArticles = await Articles.find().sort({createdAt:-1})

        return new Response(JSON.stringify(allArticles), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}