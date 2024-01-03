import Portfolio from "@models/portfolio"
import { calcRating } from "@utils/calcRating"
import { connectMongo } from "@utils/dbconnect"


export const PATCH = async(req,{params})=>{
    const comment = await req.json()
    try {
        await connectMongo()
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(params.id,{$push:{comments:comment}},{new:true})

        const newRating = calcRating(updatedPortfolio.comments)

        updatedPortfolio.totalRating = newRating

        updatedPortfolio.save()

        const newComments = updatedPortfolio.comments.sort((a,b)=> b.createdAt - a.createdAt)

        return new Response(JSON.stringify(newComments), {status:200})


    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify(err), {status:err.status || 500})
    }
}