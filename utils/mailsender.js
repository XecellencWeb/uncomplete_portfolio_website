import nodemailer from 'nodemailer'

export const sendMail = async(mail)=>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user:process.env.mailer_email,
            pass: process.env.mailer_password
        }
    })

    const {to,from,fullName,subject,message} = mail

    const Mail = {
        from: process.env.mailer_email,
        to,subject,
        html: `
        <body style='width:100vw; display:flex; justify-content:center'>
        <div style='background:#f3fbf3; width:min(40rem,100% - 3rem); margin-inline:auto; border-radius:1rem; margin-top:5rem; font-family:Mooli,sans-serif; margin:0; padding:16px;'>
        <h1 style='font-size:25px; line-height:1.1'>A Message from ${fullName}</h1>
        <h1 Style='font-size:20px; line-height:1.1'>${subject}</h1>
        <p style='font-size:16px; line-height:1.5'>${message}</p>
        <p style='margin-top:10px;'>from ${from}</p>
        </div>
        </body>`
    }

    transporter.sendMail(Mail).then(_=>{
        return true
    }).catch(_=>{
        return false
    })
}