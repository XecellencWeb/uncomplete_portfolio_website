import { popup } from "./box/popupbox"
import { postData } from "./requests/post"

export const storeSession = (session,name)=>{

    window.localStorage.setItem(name, JSON.stringify(session))
    
}

export const deleteSession = (name)=>{
    localStorage.removeItem(name)
    return {done:true}
}


export const getSessionData = (value,name)=>{
    const session = JSON.parse(window.localStorage.getItem(name || 'logged_in_user'))
    if(!session)return null 
    if(!value) return session
    return session[value]
}

export const setSessionData = (property,value)=>{
    const session = getSessionData()
    session[property] = value

    window.localStorage.setItem('logged_in_user',JSON.stringify(session))
}



export const setUserSession = async(user,name)=>{
    if(!user.isVerified){
        const sent = await postData('/api/mailer',{
            to:user.email,
            from:'josiahn234@gmail.com',
            subject:'Verify your email Account to Continue with Us.',
            message: `Vist the link <a href='http://localhost:3000/verify/${user.verifyCode}'>verify email</a> to verify your email account.`,
            fullName: 'Josiah Newman'
        })
        if(!sent) return {done:false}
        
        popup({
            heading:'Verification Email Sent Successfully',
            text: `An email has been sent to ${user.email}. Please check email to verify your account.`
        })
    }

    if(!name)return {done:false}
    storeSession(user,name)
    return {done:true}
}