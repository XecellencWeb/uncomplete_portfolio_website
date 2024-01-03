import { Schema, models, model } from "mongoose";

const planSchema = new Schema({
    name:{
        type:String,
        required:[true, 'Name must be provided']
    },
    desc:{
        type:String,
        required:[true, 'Description must be provided']
    },
    type:{
        type:String,
        required:[true, 'Type must be provided']
    },
    basicPlan:{
        type:{
            price:{
                type:Number,
                required:[true,'Name of PLan must be Provided']
            },
            desc:{
                type:String,
                required:[true,'Description is not Provided']
            },
            features:{
                type:[String],
                required:[true,'Features must be Defined for plan']
            }
        },
        required:true
    },
    standardPlan:{
        type:{
            price:{
                type:Number,
                required:[true,'Name of PLan must be Provided']
            },
            desc:{
                type:String,
                required:[true,'Description is not Provided']
            },
            features:{
                type:[String],
                required:[true,'Features must be Defined for plan']
            }
        },
        required:true
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

const Plan = models.plan || model('plan',planSchema)
export default Plan