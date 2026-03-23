"use client"

import Link from "next/link"
import { useCart } from "../store/cartStore"
import { useAuth } from "@/store/authStore"
import { useEffect, useState } from "react"

export default function Navbar(){
    const cart = useCart(state=>state.cart)
    const token = useAuth(state=>state.token)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdminUser, setIsAdminUser] = useState(false)

    useEffect(() => {
        const tok = token || (document.cookie.split(';').find(row => row.startsWith('token=')) ? document.cookie.split(';').find(row => row.startsWith('token=')).split('=')[1] : null)
        if (tok) {
            try {
                const payload = JSON.parse(atob(tok.split('.')[1]))
                setIsAdminUser(payload.isAdmin === true)
            } catch {
                setIsAdminUser(false)
            }
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
            setIsAdminUser(false)
        }
    }, [token])

    return(
        <nav className="navbar">
            <div className="container">
                <ul className="nav-links">
                    <li>
                        <Link href="/" className="logo">DevinBay</Link>
                    </li>
                    <li>
                        <Link href="/cart" className="nav-link">Cart ({cart.length})</Link>
                    </li>
                    {!isLoggedIn && (
                        <>
                            <li>
                                <Link href="/login" className="nav-link">Login</Link>
                            </li>
                            <li>
                                <Link href="/signup" className="nav-link">Signup</Link>
                            </li>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link href="/dashboard" className="nav-link">Dashboard</Link>
                            </li>
                            {isAdminUser && (
                                <li>
                                    <Link href="/admin" className="nav-link">Admin</Link>
                                </li>
                            )}
                            <li>
                                <Link href="/logout" className="nav-link">Logout</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}
