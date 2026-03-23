"use client"

import { useCart } from "../../store/cartStore"

export default function CartPage() {
    const {cart,removeFromCart,increaseQty,decreaseQty} = useCart()
    const total = cart.reduce(
        (sum,item)=>sum + item.price * item.quantity,0
    )
    return(
        <div className="cart-container">
            <h1>Shopping Cart</h1>
{cart.map(item=>(
                <div key={item._id} className="cart-item">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                    <div className="qty-controls">
                        <button className="btn btn-outline" onClick={()=>decreaseQty(item._id)}>-</button>
                        <span>{item.quantity}</span>
                        <button className="btn btn-outline" onClick={()=>increaseQty(item._id)}>+</button>
                    </div>
                    <button className="btn btn-danger" onClick={()=>removeFromCart(item._id)}>Remove</button>
                </div>
            ))}
            {cart.length > 0 && (
                <Link href="/checkout" className="btn" style={{width: '300px', margin: '20px auto 0', display: 'block'}}>
                    Proceed to Checkout (${total.toFixed(2)})
                </Link>
            )}
            <h2 className="total-price">
                Total: ${total.toFixed(2)}
            </h2>
        </div>
    )
}

import Link from "next/link"
