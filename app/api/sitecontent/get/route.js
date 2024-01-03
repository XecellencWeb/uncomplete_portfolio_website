import siteContent from "@models/sitecontent"
import { connectMongo } from "@utils/dbconnect"

export const GET = async()=>{
    try {
        await connectMongo()
        const content = await siteContent.findOne({name:'josiah_world'})
        return new Response(JSON.stringify(content), {status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:err.status})
    }
}