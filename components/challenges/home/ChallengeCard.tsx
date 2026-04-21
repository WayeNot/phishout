import { HiOutlineSparkles } from "react-icons/hi";
import { IoMdArrowForward } from "react-icons/io";

export default function ChallengeCard({ title, onClick }: any) {
    return (
        <button onClick={onClick} className="group relative bg-[#1e1e2f] border border-white/10 hover:border-orange-500/30 rounded-xl px-4 py-3 text-sm text-white/60 hover:text-white transition duration-500 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative flex items-center justify-between gap-2">
                <HiOutlineSparkles className="text-orange-400 opacity-0 group-hover:opacity-100 transition duration-500" />
                <span className="truncate">{title}</span>
                <IoMdArrowForward className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition duration-500" />
            </div>
        </button>
    );
}