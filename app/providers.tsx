"use client"

import { NotifProvider } from "@/components/NotifProvider"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import NavbarNotConnected from "@/components/NavbarNotConnected"
import { User } from "@/lib/types"
import Footer from "@/components/Footer"

export default function Providers({ children }: { children: React.ReactNode }) {
    const [userSession, setUserSession] = useState<User | null>(null)

    useEffect(() => {
        async function getSession() {
            const res = await fetch("/api/auth/session")
            if (!res.ok) return
            setUserSession(await res.json())
        }
        getSession()
    }, [])

    return (
        <NotifProvider>
            <div className="flex flex-col min-h-screen">
                {userSession ? <Navbar /> : <NavbarNotConnected />}
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </NotifProvider>
    )
}