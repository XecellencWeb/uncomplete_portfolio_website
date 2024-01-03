import User from "@models/users"

export const PATCH = async(req, {params})=>{
    const data = await req.json()

    try {
        const user = await User.findById(params.id)
        await user.updateOne(data)

        return new Response(JSON.stringify('Data Updated Successfully'), { status: 200 })
    } catch (err) {
        return new Response(JSON.stringify(err.message), {status: err.status})
    }

}