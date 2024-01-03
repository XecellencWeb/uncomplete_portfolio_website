import {Schema, model, models} from 'mongoose'

const userSchema = new Schema({
    fullName:{
        type:String,
        required:[true,'Fullname must be provided']
    },
    email:{
        type:String,
        required:[true,'Email must be provided'],
        unique:[true,'This email already exist']
    },
    password:{
        type:String,
        required:[true,'Password is Required']
    },
    picture:{
        type:String,
        default:''
    },
    about:String,
    isVerified:{
        type:Boolean,
        default:false
    },
    verifyCode:{
        type:String,
        default: process.env.verify_code
    },
    isBoss:{
        type:Boolean,
        default:false
    },
    updatedAt:{
        type:Date,
        default:Date.now(),
        immutable:false
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        immutable:true
    }

})


const User = models.User || model('User',userSchema) 
export default User