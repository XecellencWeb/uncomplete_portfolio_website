import { ownerEmail, ownerFullName } from "@constants/ownerInfo"
import { pagepasskey } from "@constants/tokens"
import Sales from "@models/sales"
import { connectMongo } from "@utils/dbconnect"
import { sendMail } from "@utils/mailsender"

export const PATCH = async(req,{params})=>{
    const {extraInfo,userEmail} = await req.json()
    try {
        await connectMongo()
        const {_id:id} = await Sales.findByIdAndUpdate(params.id,{done:true},{new:true})
        await sendMail({
            to:userEmail,
            from:ownerEmail,
            fullName:ownerFullName,
            subject:'Your Application has been completed',
            message:`Your apllication has just been completed.${extraInfo}.
            <p>you can visit <a href='${process.env.website_url}/receipts/${id}?passkey=${pagepasskey}'>View Reciept</a></p>`
        })
        return new Response(JSON.stringify('Successfull'), {status:200})
    } catch (err) {
        return new Respone(JSON.stringify(err), {status:err.status || 500})
    }
} 