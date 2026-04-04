"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaNewspaper } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showPaper, setShowPaper] = useState(false)
    const [paperState, setPaperState] = useState(0)

    const patchnote = [
        { title: "05/04/2026", patch: [{ text: "Déconnexion fonctionnel" }, { text: "Création de compte terminé" }] },
        { title: "04/04/2026", patch: [{ text: "Ajout de page Coming soon" }, { text: "Résolution de beug sur le fichier ressource" }, { text: "Ajout de la page d'accueil + nos challenges" }] },
    ]

    const features = [
        { title: "Création des comptes" },
        { title: "Login fonctionnel" },
        { title: "Création du panel admin" },
        { title: "Ajout de log" },
    ]

    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.id === "overlay") setShowPaper(false)
        }
        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [])

    const handleLogout = async (e: any) => {
        const res = await fetch("/api/session", {
            method: "DELETE",
        })

        if (res.ok) {
            const router = useRouter();
            router.refresh()
        }
    }

    return (
        <div>
            <nav className="flex items-center justify-between p-4 mx-3 sm:mx-5">
                <div className="flex items-center justify-center gap-3 text-white/40">
                    <h1 className="text-xl sm:text-2xl text-white/60 font-bold">CTF CyberLab</h1>
                    <FaNewspaper onClick={() => setShowPaper(!showPaper)} className="hover:text-white/70 cursor-pointer text-xl transition duration-500" />
                </div>

                <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-white text-2xl">☰</button>

                <div className="hidden sm:flex items-center gap-5 text-white/40">
                    <Link href="/Pages/home" className="hover:text-white/70 cursor-pointer transition duration-500">Accueil</Link>
                    <Link href="/Pages/challenges" className="hover:text-white/70 cursor-pointer transition duration-500">Nos challenges</Link>
                    <Link href="/Pages/accounts" className="hover:text-white/70 cursor-pointer transition duration-500">Mon compte</Link>
                    <MdExitToApp onClick={handleLogout} className="hover:text-white/70 cursor-pointer text-xl transition duration-500" />
                </div>
            </nav>
            {menuOpen && (
                <div className="sm:hidden px-4 pb-4 animate-fadeIn">
                    <div className="flex flex-col gap-3">
                        <button className={` w-full text-left px-4 py-3 rounded-lg text-white/70 hover:bg-[#3a3a4d] transition`}>Nos challenges</button>
                        <button className="w-full text-left px-4 py-3 rounded-lg bg-[#2a2a3d] text-white/70 hover:bg-[#3a3a4d] transition">Mon compte</button>
                        <button className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"><MdExitToApp />Déconnexion</button>
                    </div>
                </div>
            )}
            {showPaper && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-[#1e1e2f] border border-gray-700 rounded-2xl shadow-2xl p-6 animate-fadeIn">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-5">
                                <button onClick={() => setPaperState(0)} className={`${paperState == 0 ? "bg-[#2a2a3d] rounded-[5px] hover:bg-[#2a2a3d]/70 transition duration-500" : ""} text-xl font-bold text-white cursor-pointer hover:text-white/40 transition duration-500 p-2`}>PatchNotes</button>
                                <button onClick={() => setPaperState(1)} className={`${paperState == 1 ? "bg-[#2a2a3d] rounded-[5px] hover:bg-[#2a2a3d]/70 transition duration-500" : ""} text-xl font-bold text-white cursor-pointer hover:text-white/40 transition duration-500 p-2`}>Features</button>
                            </div>
                            <button onClick={() => setShowPaper(!showPaper)} className="text-gray-400 hover:text-white transition cursor-pointer transition duration-500">✕</button>
                        </div>
                        <hr className="my-5 text-white" />
                        <div className="flex items-center flex-col gap-5">
                            {paperState == 0 && (
                                <div className="w-full">
                                    {patchnote.map((el) => (
                                        <div key={el.title} className="flex flex-col justify-between items-center mb-4 w-full">
                                            <h2 className="text-xl font-bold text-white">PatchNote du <span className="text-white/40 font-bold italic">{el.title}</span></h2>
                                            <div className="w-full mt-4 px-4 py-2 rounded-lg bg-[#2a2a3d] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                {el.patch?.map((patch) => (
                                                    <p>✔️ - {patch.text}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {paperState == 1 && (
                                <div className="flex flex-col justify-between items-center mb-4 w-full">
                                    <h2 className="text-xl font-bold text-white">En cours de développement :</h2>
                                    <div className="w-full mt-4 px-4 py-2 rounded-lg bg-[#2a2a3d] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        {features.map((el) => (
                                            <p>⏳ {el.title}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}