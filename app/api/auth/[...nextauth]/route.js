import User from '@models/users'
import { connectMongo } from '@utils/dbconnect'
import { signUser } from '@utils/signusers'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.google_clientid,
            clientSecret: process.env.google_clientsecret
        })
    ],
    callbacks:{
        async session({session}){
                const currentUser = await User.findOne({
                    email: session.user.email
                })
                session.user.id = currentUser._id.toString()

                return session
                
        },
        async signIn ({profile}){

            try {
                await connectMongo()
                const userExist = await User.findOne({
                    email:profile.email
                })
                if(!userExist){
                    await User.create({
                        email:profile.email,
                        fullName: profile.name,
                        password: profile.name.replace(/ /g,''),
                        picture: profile.picture,
                        verified: true
                    })
                }
            return true
            } catch (err) {
                return false
            }
        }
    }
})


export {handler as GET, handler as POST}