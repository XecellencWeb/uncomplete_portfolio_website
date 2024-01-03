import { model, models , Schema } from "mongoose";

const salesSchema = new Schema ({
    name:String,
    price:Number,
    paymentMade:String,
    type:String,
    requirements:{
        description:String,
        requireText:[String],
        link:String,
        assetStore:[String]
    },
    done:{
        type:Boolean,
        default:false
    },
    userInfo:{
        email:String,
        fullName:String
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


const Sales = models.Sales || model('Sales',salesSchema)

export default Sales