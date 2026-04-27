export default function HomeTabs({ tab, setTab }: any) {
    return (
        <div className="flex items-center gap-2 m-6">
            <button onClick={() => setTab(0)} className={`px-4 py-2 rounded-xl text-sm border transition duration-500 cursor-pointer ${tab === 0 ? "bg-orange-500/15 text-orange-300 border-orange-500/30" : "bg-[#1e1e2f] text-white/40 border-white/10"}`}>🚩 CTF</button>
            <button onClick={() => setTab(1)} className={`px-4 py-2 rounded-xl text-sm border transition duration-500 cursor-pointer ${tab === 1 ? "bg-orange-500/15 text-orange-300 border-orange-500/30" : "bg-[#1e1e2f] text-white/40 border-white/10"}`}>📍 GEOINT</button>
        </div>
    );
}