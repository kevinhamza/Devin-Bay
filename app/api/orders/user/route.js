import {connectDB} from "@/lib/mongodb"
import {cookies} from "next/headers"
import Order from "@/models/Order.js"
import {NextResponse} from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export async function GET(req){
    await connectDB()
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if(!token){
        return NextResponse.json({error:"Unauthorized"}, {status:401})
    }
    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET)
    } catch(err) {
        return NextResponse.json({error:"Invalid token"}, {status:401})
    }
    const orders = await Order.find({
        userId: decoded.id
    })
    return NextResponse.json(orders)
}
