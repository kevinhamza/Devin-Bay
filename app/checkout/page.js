"use client"

import { useCart } from "../../store/cartStore"

export default function Checkout(){
    const {cart,clearCart} = useCart()
    const total = cart.reduce(
        (sum,item)=>sum + item.price * item.quantity,0
    )
    const placeOrder = async ()=>{
        const res = await fetch("/api/orders",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                cart,
                total,
                paymentMethod:"COD"
            })
        })
        if (res.ok) {
            clearCart()
            alert("Order placed")
        } else {
            alert("Order failed - check login")
        }
    }
    return(
        <div className="cart-container">
            <h1>Checkout</h1>
            <h2 className="total-price">Total: ${total.toFixed(2)}</h2>
            <button className="btn" style={{width: '300px', margin: '0 auto', display: 'block'}} onClick={placeOrder}>
                Place Order (Cash on Delivery)
            </button>
        </div>
    )
}