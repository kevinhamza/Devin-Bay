import {connectDB} from "@/lib/mongodb"
import Product from "@/models/Products.js"
import {NextResponse} from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req){
    await connectDB()
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if(!token){
        return NextResponse.json({error:"Unauthorized"}, {status:401})
    }
    let decoded
    try {
        decoded = jwt.verify(token, JWT_SECRET)
    } catch {
        return NextResponse.json({error:"Invalid token"}, {status:401})
    }
    if(!decoded.isAdmin){
        return NextResponse.json({error:"Admin only"}, {status:403})
    }
    const body = await req.json()
    const product = await Product.create(body)
    return NextResponse.json(product)
}
