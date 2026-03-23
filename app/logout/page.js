"use client"

import { useEffect } from "react"
import { useAuth } from "@/store/authStore"
import { useRouter } from "next/navigation"

export default function Logout() {
    const router = useRouter()
    const setToken = useAuth(state => state.setToken)

    useEffect(() => {
        setToken(null)
        localStorage.removeItem("token")
        alert("Logged out successfully")
        router.push("/login")
    }, [setToken, router])
    return <p>Logging out...</p>
}