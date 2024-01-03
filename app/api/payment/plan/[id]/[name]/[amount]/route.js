import { toBuyToken } from "@constants/tokens"
import Plan from "@models/plans"
import { connectMongo } from "@utils/dbconnect"
import Stripe from "stripe"


const pay = new Stripe(process.env.stripe_private_key,{
    apiVersion: "2022-11-15"
})

const MakePayment = async(product,amount)=>{
  const query =  await pay.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
            {
                price_data:{
                    currency: 'EUR',
                    product_data:{
                        name: product.name || `josiah's product`
                    },
                    unit_amount: amount === 'half'? product.price/2 : product.price,
                },
                quantity: 1
            }
        ],
        success_url:`${process.env.website_url}?paymentsuccessful=true&sign=${toBuyToken}`,
        cancel_url:`${process.env.website_url}?paymentsuccessfull=false&sign=${toBuyToken}`,
    })

    return query
}


export const GET = async(req,{params})=>{
   
    try {
        await connectMongo()
        const plan = await Plan.findById(params.id)
        if(!plan){
            return new Response(JSON.stringify('This plan does not exist on the server anymore'), {status:404})
        }
        const planToBuy = plan[params.name]
       const success = await MakePayment(planToBuy,params.amount)
       console.log(success)
        return new Response(JSON.stringify(success), {status:200})
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify(err), {status:err.status})
    }
}