import { BiPlusCircle } from "react-icons/bi";
import { staff_role } from "@/lib/config";
import { useCtfBuilderStore } from "@/stores/useCtfBuilderStore";

export default function CreateButtons({ type, role, onGeoOpen }: any) {    
    if (!staff_role.includes(role || "")) return null;

    if (type === "ctf") {
        return (
            <button onClick={() => useCtfBuilderStore.getState().setOpen(true)} className={`flex items-center gap-4 px-4 py-2 text-sm text-[20px] ml-10 border border-white/10 hover:border-white/40 transition duration-500 cursor-pointer font-mono text-white/40`}><BiPlusCircle className="text-white/40" />Créer un CTF</button>
        );
    }

    return (
        <button onClick={onGeoOpen} className={`flex items-center gap-4 px-4 py-2 text-sm text-[20px] ml-10 border border-white/10 hover:border-white/40 transition duration-500 cursor-pointer font-mono text-white/40`}><BiPlusCircle className="text-white/40" />Créer un GEOINT</button>
    );
}

