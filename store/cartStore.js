"use client"

import { create } from "zustand"

export const useCart = create((set,get) => ({
    cart:[],
    addToCart:(product)=> {
        const exists = get().cart.find(p=>p._id === product._id)
        if (exists) {
            set({
                cart: get().cart.map( p=> 
                    p._id === product._id
                    ? {...p, quantity: p.quantity + 1}
                    : p
                )
            })
        } else {
            set({
                cart : [...get().cart, {...product, quantity:1}]
            })
        }
    },
    removeFromCart:(id)=>{
        set({
            cart: get().cart.filter(p=>p._id !== id)
        })
    },
    increaseQty:(id)=>{
        set({
            cart: get().cart.map(p=>
                p._id === id
                ? {...p, quantity: p.quantity + 1}
                : p
            )
        });
    },
    decreaseQty:(id)=>{
        set({
            cart: get().cart.map(p =>
                p._id === id && p.quantity > 1
                ? {...p, quantity: p.quantity - 1}
                : p
            )
        })
    },
    clearCart: () => set({ cart: [] })
}))