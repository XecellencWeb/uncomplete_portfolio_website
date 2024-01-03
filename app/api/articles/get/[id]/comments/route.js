
import Articles from "@models/articles"
import { connectMongo } from "@utils/dbconnect"

export const GET = async(req,{params})=>{
    try {
        await connectMongo()

        const Article = await Articles.findById(params.id)
        const comments = Article.comments.sort((a,b)=> b.createdAt - a.createdAt)

        return new Response(JSON.stringify(comments), {status:200})
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}