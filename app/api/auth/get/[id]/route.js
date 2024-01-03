import User from "@models/users"
import { connectMongo } from "@utils/dbconnect"

export const GET = async ({params})=>{
try {
    await connectMongo()

    const online = await User.findById(params.id)

    return new Response(JSON.stringify(online),{status:200})
} catch (err) {
    return new Response(JSON.stringify(err), {status:err.status})
}
}