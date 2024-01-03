import siteContent from "@models/sitecontent"
import { connectMongo } from "@utils/dbconnect"

export const POST = async(req)=>{
    const query = await req.json()
    let content = null

    try {
        await connectMongo()
        const content = await siteContent.findOneAndUpdate({name:'josiah_world'},query,{upsert:true,new:true,setDefaultsOnInsert:true})
        return new Response(JSON.stringify(content),{status:200})
    } catch (err) {
        return new Response(JSON.stringify(err), {status:200})
    }
}