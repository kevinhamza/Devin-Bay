"use client"

import {useCart} from "@/store/cartStore"

export default function ProductCard({product, addToCart}){
    return(
        <div className="product-card">
            <img src={product.image || '/placeholder.jpg'} alt={product.name} className="product-image" />
            <h2 className="product-name">
                {product.name}
            </h2>
            <p className="product-price">${product.price}</p>
            <button onClick={()=>addToCart(product)} className="btn">
              Add to Cart
            </button>
        </div>
      )
    }
