import {connectDB} from "@/lib/mongodb"
import {cookies} from "next/headers"
import Order from "@/models/Order.js"
import {NextResponse} from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req) {
    await connectDB()
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if(!token){
        return NextResponse.json({error:"Unauthorized"}, {status:401})
    }
    let decoded
    try {
        decoded = jwt.verify(token,JWT_SECRET)
    } catch {
        return NextResponse.json({error:"Invalid token"}, {status:401})
    }
    const body = await req.json()
    if (!body.cart || !body.total) {
        return NextResponse.json(
            { error: "Invalid data" },
            { status: 400 }
        )
    }
    const order = await Order.create({
        ...body,
        userId: decoded.id
    })
    return NextResponse.json(order)
}
