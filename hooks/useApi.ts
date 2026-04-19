"use client"

import { useNotif } from "@/components/NotifProvider"

export const useApi = () => {
    const { showNotif } = useNotif()

    const call = async (url: string, options?: RequestInit, successMsg?: string) => {
        try {
            const res = await fetch(url, {
                headers: { "Content-Type": "application/json" },
                ...options
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Erreur API")
            }

            if (successMsg) {
                showNotif(successMsg, "success")
            }

            return data
        } catch (err: any) {
            showNotif(err.message, "error")
            throw err
        }
    }

    return { call }
}