"use client"

import "./globals.css"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import Navbar from "@/components/Navbar"
import NavbarNotConnected from "@/components/NavbarNotConnected"
import Footer from "@/components/Footer"
import { NotifProvider } from "@/components/NotifProvider"
import { User } from "@/lib/types"
import { default_pp } from "@/lib/config"
import { useRouter } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null)

    const getSession = async () => {
        try {
            const res = await fetch("/api/auth/session")
            if (!res.ok) {
                router.refresh()
                router.push("/accounts/login")
                return
            }
            const data = await res.json()
            if (data.isGuest) {
                setUser({ username: "Invité", status: "online", user_id: Date.now(), role: "guest", pp_url: default_pp, password: "", is_online: true, email: "guest@invite.com", coin: 9999, created_at: "" })
                return
            }
            setUser(data)
        } catch {
            setUser(null)
        }
    }

    useEffect(() => {
        getSession()
    }, [pathname])

    return (
        <html lang="fr">
            <body className="min-h-screen flex flex-col">
                <NotifProvider>

                    {!pathname.startsWith("/accounts") && (
                        <div>
                            {user ? <Navbar /> : <NavbarNotConnected />}
                        </div>
                    )}


                    <main className="flex-1 relative">
                        {children}
                    </main>

                    {!pathname.startsWith("/accounts") && (
                        <Footer />
                    )}

                </NotifProvider>
            </body>
        </html>
    )
}