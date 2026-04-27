"use client"

import { useState } from "react";
import DropDown from "../ui/DropDown";
import { difficulty, difficultyBtn, NewCtfFlag } from "@/lib/types";
import { useNotif } from "../NotifProvider";

type CreateFlagType = {
    onClose: () => void;
    onSubmit: (flag: NewCtfFlag) => void;
}

export default function CreateFlag({ onClose, onSubmit } : CreateFlagType ) {
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
            <div className="bg-[#1e1e2f] p-6 rounded-2xl w-2/7 text-white shadow-2xl space-y-5 border border-white/10">
                <div className="text-center space-y-1">
                    <h2 className="text-xl font-bold">Création d’un flag</h2>
                    <p className="text-white/40 text-xs">Configure chaque flag a ta manière !</p>
                </div>
                <div className="bg-[#2a2a3d] px-3 py-2 rounded-lg text-xs text-white/60">Format du flag attendu : <span className="text-orange-400 font-semibold">Prénom_Nom</span></div>
                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <input className="p-2 bg-[#2a2a3d] rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500" placeholder="Titre" value={newFlag.title} onChange={e => setNewFlag({ ...newFlag, title: e.target.value })} />
                        <DropDown isOnce label="Difficulté" value={newFlag.difficulty} isOpen={settingsNewFlag.difficulty} options={difficultyBtn} onToggle={() => setSettingsNewFlag(s => ({ ...s, difficulty: !s.difficulty }))} onSelect={v => { setNewFlag({ ...newFlag, difficulty: v as difficulty }); setSettingsNewFlag({ ...settingsNewFlag, difficulty: false }) }} />
                    </div>
                    <textarea className="w-full p-2 bg-[#2a2a3d] rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500 resize-none h-20" placeholder="Description" value={newFlag.description} onChange={e => setNewFlag({ ...newFlag, description: e.target.value })} />
                    <div className="grid grid-cols-2 gap-2">
                        <input className="p-2 bg-[#2a2a3d] rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500" placeholder="Format (Prénom_Nom)" value={newFlag.flag_format} onChange={e => setNewFlag({ ...newFlag, flag_format: e.target.value })} />
                        <input className="w-full p-2 bg-[#2a2a3d] rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500" placeholder="Flag attendu" value={newFlag.flag} onChange={e => setNewFlag({ ...newFlag, flag: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <input className="p-2 bg-[#2a2a3d] rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500" placeholder="Indice" value={newFlag.hint} onChange={e => setNewFlag({ ...newFlag, hint: e.target.value })} />
                        <input className="p-2 bg-[#2a2a3d] rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500" placeholder="Coût hint" value={newFlag.hint_cost ?? ""} type="number" onChange={e => setNewFlag({ ...newFlag, hint_cost: Number(e.target.value) })} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <input className="p-2 bg-[#2a2a3d] rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500" placeholder="Coins" value={newFlag.coins ?? ""} type="number" onChange={e => setNewFlag({ ...newFlag, coins: Number(e.target.value) })} />
                        <input className="p-2 bg-[#2a2a3d] rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500" placeholder="Points" value={newFlag.points ?? ""} type="number" onChange={e => setNewFlag({ ...newFlag, points: Number(e.target.value) })} />
                    </div>
                </div>
                <div className="flex gap-2 pt-1">
                    <button onClick={onClose} className="flex-1 bg-red-600 hover:bg-red-500 transition py-1.5 rounded-lg text-sm font-medium">Fermer</button>
                    <button onClick={() => { if (!canSubmit) { showNotif("Veuillez remplir tout les champs !"); return; } onSubmit(newFlag); resetForms(); }} className="flex-1 bg-green-600 hover:bg-green-500 transition py-1.5 rounded-lg text-sm font-medium">Ajouter</button>
                </div>
            </div>
        </div>
    )
}