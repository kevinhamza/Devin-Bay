"use client"

import {useAuth} from "@/store/authStore"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";

export default function Admin(){
    const router = useRouter()
    const token = useAuth(state=>state.token)
    const [orders,setOrders] = useState([])
    const [name,setName] = useState("")
    const [price,setPrice] = useState("")
    const [image,setImage] = useState("")

    useEffect(() => {
        if(!token) {
            router.push("/login")
            return
        }
        try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            if (!payload.isAdmin) {
                router.push("/dashboard")
                return
            }
        } catch {
            router.push("/login")
            return
        }
        fetch("/api/admin/orders")
        .then(res=>res.json())
        .then(data=>setOrders(data))
    },[token])

    const updateStatus = async (orderId,status)=>{
        await fetch("/api/admin/orders/update",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({orderId,status})
        })
        .then(res=>res.json())
        router.refresh()
    }

    const createProduct = async ()=>{
        await fetch("/api/admin/products",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                name,
                price:parseFloat(price),
                image
            })
        })
        alert("Product created")
        setName("")
        setPrice("")
        setImage("")
    }

    return(
        <div>
            <div className="admin-section">
                <h1>Admin Panel</h1>
                <div className="form-group">
                    <label>Product Name</label>
                    <input className="form-control" placeholder="Product name" value={name} onChange={e=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input className="form-control" type="number" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input className="form-control" placeholder="Image URL" value={image} onChange={e=>setImage(e.target.value)}/>
                </div>
                <button className="btn" onClick={createProduct}>
                    Add Product
                </button>
            </div>
            <div className="admin-section">
                <h1>Admin Orders</h1>
{Array.isArray(orders) && orders.length === 0 ? (
                    <p>No orders</p>
                ) : Array.isArray(orders) ? orders.map(order => (
                        <div key={order._id} className="order-item">
                            <p><strong>User:</strong> {order.userId}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Total:</strong> ${order.total}</p>
                            <h3>Items:</h3>
                            <ul>
                                {order.cart.map((item,i)=>(
                                    <li key={i}>
                                        {item.name} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <button className="btn btn-success" onClick={()=>updateStatus(order._id,"shipped")}>
                                    Mark as Shipped
                                </button>
                                <button className="btn btn-success" onClick={()=>updateStatus(order._id,"delivered")}>
                                    Mark as Delivered
                                </button>
                            </div>
                        </div>
                    )) : <p>Loading...</p>}
            </div>
        </div>
    )
}
