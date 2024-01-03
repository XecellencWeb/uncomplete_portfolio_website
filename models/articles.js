import { model, Schema, models } from "mongoose";

const articleSchema = new Schema({
    name:String,
    description:String,
    articleCoverImage:String,
    contents:[Object],
    createdAt:{
        type:Date,
        default:Date.now(),
        immutable:true
    },
    updatedAt:{
        type:Date,
        default:Date.now(),
        immutable:false
    },
    comments:{
        type:[{
        userId:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        name:String,
        picture:String,
        rating:Number,
        comment:String,
        reply:{
            type:[{
                userId:{
                    type:Schema.Types.ObjectId,
                    ref:'User'
                },
                name:String,
                picture:String,
                reply:String
            }],
            default:[]
        },
        thumbsup:{
            type:Number,
            default: 0
        },
        love:{
            type:Number,
            default: 0
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }
    }],
    default:[]
},
    totalRating:Number,
})

const Articles = models.Articles || model('Articles',articleSchema)


export default Articles