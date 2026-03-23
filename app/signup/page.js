"use client"

import { useState } from "react"
import { useAuth } from "@/store/authStore"
import { useRouter } from "next/navigation"

export default function Signup() {
    const router = useRouter()
    const setToken = useAuth(state => state.setToken)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = async () => {
        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "signup",
                    name,
                    email,
                    password
                })
            })

            const data = await res.json().catch(()=> ({}))
            if (data.error) {
                alert(data.error)
                return
            }

            const loginRes = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "login",
                    email,
                    password
                })
            })

            const loginData = await loginRes.json()

            if (loginData.token) {
                setToken(loginData.token)
                localStorage.setItem("token", loginData.token)
                alert("Signup successful!")
                router.push("/dashboard")
            }

        } catch (err) {
            console.error(err)
            alert("Signup failed")
        }
    }

    return (
        <div className="cart-container" style={{maxWidth: '400px'}}>
            <h1>Signup</h1>
            <div className="form-group">
                <label>Name</label>
                <input className="form-control" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input className="form-control" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn" onClick={handleSignup}>
                Signup
            </button>
        </div>
    )
}