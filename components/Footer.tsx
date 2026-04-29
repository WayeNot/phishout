import { owners } from "@/lib/config";

export default function Footer() {

    return (
        <footer className="w-full flex flex-col items-center justify-center gap-3 sm:gap-5 text-white/40 text-xs sm:text-sm px-4 py-5 border-t border-gray-700/50 backdrop-blur-md mt-auto">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                {owners.map((el) => (
                    <a key={el.name} className="hover:text-white/80 transition duration-500 font-mono hover:underline" target="_blank" href={el.linkedin}>{el.name}</a>
                ))}
            </div>
            <p className="w-full text-center text-white/30 text-xs mt-2">© 2026 FlagCore - Tous droits réservés</p>
        </footer>
    )
}