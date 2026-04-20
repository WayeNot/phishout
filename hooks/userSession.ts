import { useNotif } from "@/components/NotifProvider"
import { default_pp } from "@/lib/config"
import { User } from "@/lib/types"
import { useEffect, useState } from "react"
import { useApi } from "./useApi"

export const useSession = () => {
    const { showNotif } = useNotif()
    const { call } = useApi()

    const [userSession, setUserSession] = useState<User | null>(null)

    useEffect(() => {
        async function getSession() {
            try {
            console.log("UserSession called !");

                const data = await call("/api/auth/session")
                if (data.isGuest) {
                    setUserSession({ username: "Invité", status: "online", user_id: Date.now(), role: "guest", pp_url: default_pp, password: "", is_online: true, email: "guest@invite.com", coin: 9999, created_at: "" })
                    return
                }
                setUserSession(data)
            } catch (err) {
                showNotif("Erreur réseau")
            }
        }
        getSession()
    }, [])

    return { userSession }
}