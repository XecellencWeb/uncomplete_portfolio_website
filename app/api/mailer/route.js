import { sendMail } from "@utils/mailsender"

export const POST = async(req)=>{
    const mail = await req.json()

    try {
        await sendMail(mail)

        return new Response(JSON.stringify('Data Sent Successfully'), {status:200})
    } catch (err) {
        return new Response(JSON.stringify('An Error Occured'), {status:500})
    }
}