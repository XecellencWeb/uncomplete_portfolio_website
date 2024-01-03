import bcrypt from 'bcryptjs'

export const hashpassword = async(password,salt)=>{
    try {
        const hashed = await bcrypt.hash(password,salt)
        return hashed
    } catch (err) {
        console.log(err)
        throw new Error('An error Ocurred')
    }
}

export const compare = async(password, hashedpassword)=>{
    try {
        const right = await bcrypt.compare(password,hashedpassword)
        return right
    } catch (err) {
        console.log(err)
        throw new Error('An error Ocurred')
    }
}