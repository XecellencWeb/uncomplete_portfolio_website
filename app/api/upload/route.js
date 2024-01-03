import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_api_key,
    api_secret: process.env.cloud_api_secret
})

export const POST = async(req)=>{
    const file = await req.json() 
    console.log(file)
    try {
       const result =  await cloudinary.uploader.upload(file,{
        public_id:id
       })
       console.log(result)
       return new Response(JSON.stringify(result), {status:200})
        
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify(err), {status:err.status})
    }

}