"use client"
import {create} from "zustand"
export const useAuth = create((set)=>({
    token:null,
    setToken:(token)=> set({token})
}))