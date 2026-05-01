"use client"

import { useState } from "react";
import DropDown from "../ui/DropDown";
import { difficulty, difficultyBtn, NewCtfFlag } from "@/lib/types";
import { useNotif } from "../NotifProvider";

type InsertFileType = {
    onClose: () => void;
    onSubmit: (flag: NewCtfFlag) => void;
}

export default function CreateFlag({ onClose, onSubmit }: InsertFileType) {
    const { showNotif } = useNotif()

    const [newFlag, setNewFlag] = useState<NewCtfFlag>({ title: "", difficulty: "", description: "", flag: "", flag_format: "", hint: "", hint_cost: undefined, coins: undefined, points: undefined });
    const [settingsNewFlag, setSettingsNewFlag] = useState({ difficulty: false });

    const canSubmit = newFlag.title && newFlag.difficulty && newFlag.description && newFlag.flag && newFlag.flag_format

    const resetForms = () => {
        setNewFlag({ title: "", difficulty: "", description: "", flag: "", flag_format: "", hint: "", hint_cost: undefined, coins: undefined, points: undefined });
        setSettingsNewFlag(prev => ({ ...prev, difficulty: false }));
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
            <div className="bg-[#12121c] w-140 rounded-2xl p-5 text-white shadow-2xl border border-white/10 space-y-4">
                <div className="text-center">
                    <h2 className="text-lg font-bold">Fichiers du challenge</h2>
                    <p className="text-white/40 text-xs">Glisser-déposer ou sélectionner des fichiers</p>
                </div>
                <div className="border border-dashed border-white/20 rounded-xl p-6 cursor-pointer hover:border-orange-500 transition duration-500 flex flex-col items-center justify-center gap-2" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const files = Array.from(e.dataTransfer.files || []); setSelectedFiles(prev => [...prev, ...files]); }} onClick={() => document.getElementById("fileInput")?.click()}>
                    <input id="fileInput" type="file" multiple className="hidden" onChange={(e) => { const files = e.target.files; if (!files) return; setSelectedFiles(prev => [...prev, ...Array.from(files)]); }} />
                    <div className="text-3xl">📁</div>
                    <div className="text-sm text-white/50 text-center">Clique ou dépose tes fichiers ici</div>
                </div>
                <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                    {selectedFiles.length === 0 && <div className="text-center text-white/30 text-sm">Aucun fichier</div>}
                    {selectedFiles.map((f, i) => (
                        <div key={i} className="flex items-center justify-between bg-[#1a1a28] p-2 rounded-lg text-sm hover:bg-[#232336] transition duration-500">
                            <div className="truncate max-w-[70%] flex items-center gap-2">📄 {f.name}</div>
                            <div className="flex items-center gap-2">
                                <div className="text-white/40 text-xs">{(f.size / 1024).toFixed(1)} KB</div>
                                <button onClick={() => setSelectedFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300 cursor-pointer transition duration-500">✕</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setSettings(s => ({ ...s, files: false }))} className="w-1/2 bg-white/10 hover:bg-white/20 cursor-pointer transition duration-500 py-2 rounded-xl text-sm">Annuler</button>
                    <button onClick={() => setSettings(s => ({ ...s, files: false }))} className="w-1/2 bg-green-600 hover:bg-green-500 cursor-pointer transition duration-500 py-2 rounded-xl text-sm font-medium">Valider</button>
                </div>
            </div>
        </div>
    )
}