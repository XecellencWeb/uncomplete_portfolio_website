
import Articles from "@models/articles"
import { calcRating } from "@utils/calcRating"
import { connectMongo } from "@utils/dbconnect"


export const PATCH = async(req,{params})=>{
    const comment = await req.json()
    try {
        await connectMongo()
        const updatedArticles = await Articles.findByIdAndUpdate(params.id,{$push:{comments:comment}},{new:true})

        const newRating = calcRating(updatedArticles.comments)

        updatedArticles.totalRating = newRating

        updatedArticles.save()

        const newComments = updatedArticles.comments.sort((a,b)=> b.createdAt - a.createdAt)

        return new Response(JSON.stringify(newComments), {status:200})


    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}