"use client"

import { useSession } from "@/hooks/userSession"

export default function Home() {
    const { userSession } = useSession()
    return (
        <h2 className="w-full text-center text-white/40 text-[25px] mt-10">Nous sommes actuellement en maintenance !</h2>
    )
}