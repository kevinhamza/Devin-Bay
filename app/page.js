"use client"

import Link from "next/link"
import {useEffect,useState} from "react"
import ProductCard from "@/components/ProductCard"
import { useCart } from "@/store/cartStore"

export default function Home(){
  const [products,setProducts] = useState([])
  const addToCart = useCart(state => state.addToCart)
  useEffect(()=>{
    fetch("/api/products")
    .then(res=>res.json())
    .then(data=>setProducts(data))
  },[])
  return(
    <div className="product-grid">
      <p>Admin User :-
        user: admin@example.com,
        pass: admin123
      </p>
      <p>
        Demo User :-
        user: john@john.com,
        pass: john@john.com
      </p>
      {products.map(p=>(
        <ProductCard
          key={p._id}
          product={p}
          addToCart={addToCart}
        />
      ))}
    </div>
  )

}
