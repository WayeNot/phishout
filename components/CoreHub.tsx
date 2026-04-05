"use client"

import { useEffect, useState } from "react"
import { FaPlusSquare, FaRegEdit } from "react-icons/fa"
import { MdAdminPanelSettings } from "react-icons/md"
import { useNotif } from "./NotifProvider"

type User = {
    user_id: number
    username: string
    email: string
    password: string
    role: string
    created_at: string
}

type Suggest = {
    id: number
    user_id: number
    suggest: string
    username: string
    created_at: string
}

export default function CoreHub({ show, setShow }: { show: boolean, setShow: (v: boolean) => void }) {
    const { showNotif } = useNotif()

    const [paperState, setPaperState] = useState(0)
    const [userSession, setUserSession] = useState<{ userData: User[] }>({ userData: [] })
    const [addSuggest, setAddSuggest] = useState(false)
    const [suggestText, setSuggestText] = useState("")
    const [allSuggest, setAllSuggest] = useState<Suggest[]>([])

    const patchnote = [
        { title: "05/04/2026", patch: [{ text: "Déconnexion fonctionnel" }, { text: "Création de compte terminé" }] },
        { title: "04/04/2026", patch: [{ text: "Ajout de page Coming soon" }, { text: "Résolution de beug sur le fichier ressource" }, { text: "Ajout de la page d'accueil + nos challenges" }] },
    ]

    const features = [
        { title: "Création des comptes" },
        { title: "Login fonctionnel" },
        { title: "Création du panel admin" },
    ]

    useEffect(() => {
        async function getSession() {
            const res = await fetch("/api/session", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })

            if (!res.ok) {
                const err = await res.text()
                showNotif(err, "error");
                return
            }
            setUserSession(await res.json())
        }
        getSession()
    }, [])

    useEffect(() => {
        const handleClick = (e: any) => {
            if (e.target.id === "overlay") setShow(false)
        }
        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [setShow])

    useEffect(() => {
        const getSuggest = async () => {
            const res = await fetch("/api/suggest", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })

            if (!res.ok) {
                showNotif("Impossible de get les suggestions !", "error")
                return
            }

            const data = await res.json()
            setAllSuggest(data)
        }

        getSuggest()
    }, [addSuggest])

    useEffect(() => {
        console.log(allSuggest);
    }, [allSuggest])

    if (!show) return null

    const handleSuggest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!suggestText) {
            showNotif("Veuillez rentrer du text !")
            return
        }
        const res = await fetch("/api/suggest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userSession.userData?.[0]?.user_id, text: suggestText })
        })

        if (!res.ok) {
            const err = await res.text()
            showNotif(err, "error");
            return
        }

        setAddSuggest(false)
        setSuggestText("")

        showNotif("Suggestion envoyé avec succès !", "success")
    }

    return (
        <div id="overlay" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#1e1e2f] border border-gray-700 rounded-2xl shadow-2xl p-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-5">
                        <button onClick={() => setPaperState(0)} className={`${paperState === 0 ? "bg-[#2a2a3d]" : ""} rounded-md px-3 py-1 text-white hover:text-white/60 transition cursor-pointer`}>PatchNotes</button>
                        <button onClick={() => setPaperState(1)} className={`${paperState === 1 ? "bg-[#2a2a3d]" : ""} rounded-md px-3 py-1 text-white hover:text-white/60 transition cursor-pointer`}>Features</button>
                        <button onClick={() => setPaperState(2)} className={`${paperState === 2 ? "bg-[#2a2a3d]" : ""} rounded-md px-3 py-1 text-white hover:text-white/60 transition cursor-pointer`}>Suggestions</button>
                    </div>
                    <div>
                        {userSession.userData?.[0]?.role === "owner" ? (
                            <div className="flex items-center gap-3">
                                {paperState === 0 && (
                                    <FaPlusSquare className="text-[22px] text-white/40 hover:text-white/70 transition duration-500 cursor-pointer" />
                                )}
                                {paperState === 1 && (
                                    <FaRegEdit className="text-[22px] text-white/40 hover:text-white/70 transition duration-500 cursor-pointer" />
                                )}
                                <button onClick={() => setShow(false)} className="text-gray-400 hover:text-white transition cursor-pointer">✕</button>
                            </div>
                        ) : (
                            <button onClick={() => setShow(false)} className="text-gray-400 hover:text-white transition cursor-pointer">✕</button>
                        )}
                    </div>
                </div>

                <hr className="my-5 border-gray-600" />

                <div className="flex flex-col gap-5 max-h-[50vh] overflow-y-auto pr-2">
                    {paperState === 0 && (
                        <div className="w-full">
                            {patchnote.map((el) => (
                                <div key={el.title} className="mb-4 w-full">
                                    <h2 className="text-lg font-bold text-white">PatchNote du <span className="text-white/40 italic">{el.title}</span></h2>
                                    <div className="mt-3 px-4 py-3 rounded-lg bg-[#2a2a3d] border border-gray-600">
                                        {el.patch?.map((patch, i) => (
                                            <p key={i} className="text-white/80">✔️ - {patch.text}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {paperState === 1 && (
                        <div className="w-full">
                            <h2 className="text-lg font-bold text-white mb-2">En cours de développement :</h2>
                            <div className="px-4 py-3 rounded-lg bg-[#2a2a3d] border border-gray-600">
                                {features.map((el, i) => (
                                    <p key={i} className="text-white/80">⏳ {el.title}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {paperState === 2 && (
                        <div className="w-full">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-bold text-white mb-2">Vos suggestions</h2>
                                <FaPlusSquare onClick={() => setAddSuggest(true)} className="text-[22px] text-white/40 hover:text-white/70 transition duration-500 cursor-pointer" />
                            </div>
                            <div className="flex flex-col items-center gap-3 w-full">
                                {allSuggest.map((el, i) => (
                                    <div className="w-full text-white/80 px-4 py-3 rounded-lg bg-[#2a2a3d] border border-gray-600 flex flex-col gap-2" key={i}>
                                        <p>⏳ {el.suggest}</p>
                                        <p className="text-[12px]">@{el.username}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {addSuggest && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                            <div className="w-full max-w-md bg-[#1e1e2f] border border-gray-700 rounded-2xl shadow-2xl p-6 animate-fadeIn">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-white">Ajout d'une suggestion</h2>
                                    <button onClick={() => { setAddSuggest(false) }} className="text-gray-400 hover:text-white transition duration-500 cursor-pointer">✕</button>
                                </div>
                                <div className="my-5 flex flex-col gap-3 text-white/40">
                                    <p className="text-gray-300 text-[17px] leading-relaxed">Tu veux voir une nouvelle feature ? Dis-nous ce que tu imagines, on pourrait bien la rendre réelle.</p>
                                </div>
                                <div className="flex items-center gap-3 mb-5">
                                    <input value={suggestText} onChange={(e) => setSuggestText(e.target.value)} type="text" placeholder={`Balance ton idée !`} className="flex-1 h-[40px] px-4 rounded-lg bg-[#2a2a3d] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 text-sm sm:text-base" />
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={(e) => handleSuggest(e)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium cursor-pointer transition duration-500">Envoyer</button>
                                    <button onClick={() => setAddSuggest(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium cursor-pointer duration-500">Fermer</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}