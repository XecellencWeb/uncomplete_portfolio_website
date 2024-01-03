import Portfolio from "@models/portfolio"
import { connectMongo } from "@utils/dbconnect"

export const PATCH = async(req,{params})=>{
    const data = await req.json()
    const {type} = data
    

    try {
        await connectMongo()
       const portfolio = await Portfolio.findById(params.portfolioId)
       const comment = portfolio.comments.id(params.commentId)
        if(data.reply){
       comment.reply.push(data.reply)
            await portfolio.save()
        }else{
            comment[type] += 1
            await portfolio.save()
        }
            
        const newComments = portfolio.comments.sort((a,b)=> b.createdAt - a.createdAt)
        
        return new Response(JSON.stringify(newComments), {status:200})
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}