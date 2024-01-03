import { model,models, Schema } from "mongoose";

const portfolioSchema = new Schema({
            name:String,
            description:String,
            link:String,
            type:String,
            appPics:[String],
            createdAt:{
                type:Date,
                default:Date.now(),
                immutable:true
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
            updatedAt:{
                type:Date,
                default:Date.now(),
                immutable:false
            }
})


const Portfolio = models.portfolio || model('portfolio',portfolioSchema) 

export default Portfolio