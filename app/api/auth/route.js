import {connectDB} from "@/lib/mongodb"
import User from "@/models/User"
import {NextResponse} from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { serialize } from "cookie"

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req){
    await connectDB()
    const body = await req.json()
    const {type, name, email, password} = body
    if(type === "signup"){
        const hashed = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password:hashed
        })
        const {password: _, ...safeUser} = user._doc
        return NextResponse.json(safeUser)
    }
    if(type === "login"){
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User not found"})
        }
        const Match = await bcrypt.compare(password,user.password)
        if(!Match){
            return NextResponse.json({error:"Wrong password"})
        }
        const token = jwt.sign({
            id:user._id,
            email:user.email,
            isAdmin:user.isAdmin
        },
        JWT_SECRET,
        {expiresIn:"7d"}
        )
        const cookie = serialize("token", token, {
            httpOnly: true,
            secure: false,
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        })
        return new Response(
            JSON.stringify({message:"Logged in", token}),{
                status:200,
                headers:{
                    "Set-Cookie": cookie
                }
            }
        )
    }
}
