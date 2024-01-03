import { Schema, models, model } from "mongoose";

const contentSchema = new Schema({
    name:{
        type:String,
        default:'josiah_world'
    },
    resume:{
        type:String,
        default:''
    },
    logo:{
        type:String,
        default:''
    },
    coverPics:{
        type:String,
        default:''
    },
    about:{
        type:String,
        default:''
    },
    bio:{
        type:String,
        default:''
    },
    skills:{
        type:[{
            name:String,
            desc:String
        }],
        default:[]
    },
    available:{
        type:Boolean,
        default:true
    },
    tools:{
        type:[String],
        default:[]
    },
    assets:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        immutable:true
    },
    updatedAt:{
        type:Date,
        default:Date.now(),
        immutable:false
    }
})

const siteContent = models.siteContent || model('siteContent',contentSchema)

export default siteContent