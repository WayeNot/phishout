"use client"

import { NotifProvider } from "@/components/NotifProvider"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import NavbarNotConnected from "@/components/NavbarNotConnected"
import { User } from "@/lib/types"
import Footer from "@/components/Footer"
import { useRouter } from "next/navigation"

export default function Providers({ children }: { children: React.ReactNode }) {
    const [userSession, setUserSession] = useState<User | null>(null)

    useEffect(() => {
        async function getSession() {
            const res = await fetch("/api/auth/session")            
            if (!res.ok) return
            const data = await res.json()
            console.log(data);
            
            setUserSession(data)
        }
        getSession()
    }, [])

    return (
        <NotifProvider>
            {userSession ? (<Navbar />) : (<NavbarNotConnected />)}
            {children}
            <Footer />
        </NotifProvider>
    )
}