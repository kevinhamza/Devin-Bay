"use client"

import {useEffect,useState} from "react"
import { useRouter } from "next/navigation"

export default function Dashboard(){
  const router = useRouter()
  const [orders,setOrders] = useState([])

  useEffect(()=>{
    fetch("/api/orders/user")
    .then(res=>{
      if(res.status === 401) {
        router.push("/login")
        return
      }
      return res.json()
    })
    .then(data=>setOrders(data || []))
    .catch(err=>console.error(err))
  },[])

  return(
    <div className="admin-section">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order=>(
          <div key={order._id} className="order-item">
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
          </div>
        ))
      )}
    </div>
  )
}
