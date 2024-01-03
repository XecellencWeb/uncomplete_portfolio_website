import Articles from "@models/articles"
import { connectMongo } from "@utils/dbconnect"

export const PATCH = async(req,{params})=>{
    const data = await req.json()
    const {type} = data
    

    try {
        await connectMongo()
       const article = await Articles.findById(params.articleId)
       const comment = article.comments.id(params.commentId)
        if(data.reply){
       comment.reply.push(data.reply)
            await article.save()
        }else{
            comment[type] += 1
            await article.save()
        }
            
        const newComments = article.comments.sort((a,b)=> b.createdAt - a.createdAt)
        
        return new Response(JSON.stringify(newComments), {status:200})
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}