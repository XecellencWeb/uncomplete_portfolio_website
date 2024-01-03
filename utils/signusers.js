import { sign } from "jsonwebtoken"

export const signUser = async(user)=>{
    const token = sign({id:user._id,isBoss:user.isBoss},process.env.jwt_token)
    const newUser = {...user._doc,token}
    return newUser
}