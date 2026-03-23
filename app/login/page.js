"use client"

import {useState} from "react"
import {useAuth} from "@/store/authStore"
import { useRouter } from "next/navigation"

export default function Login() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const setToken = useAuth(state=>state.setToken)
    const router = useRouter()

    const handleLogin = async ()=>{
        const res = await fetch("/api/auth",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
            type:"login",
            email,
            password
        })
    })
    const data = await res.json()
    if(data.error){
        alert(data.error)
        return
    }
    if(data.token){
        setToken(data.token)
        localStorage.setItem("token", data.token)
        alert("Logged in")
        router.push("/dashboard")
    }
}
    return(
        <div className="cart-container" style={{maxWidth: '400px'}}>
            <h1>Login</h1>
            <div className="form-group">
                <label>Email</label>
                <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
            </div>
            <button className="btn" onClick={handleLogin}>Login</button>
        </div>
    )
}