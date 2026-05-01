"use client";

import { motion } from "motion/react";
import { useNavData } from "@/stores/store";
import { FaHelmetSafety } from "react-icons/fa6";

export default function Home() {
    const { username } = useNavData()

    let date = new Date();

    return (
        <div>
            <motion.div animate={{ rotate: [0, 180, 360] }} transition={{ duration: 3, repeat: Infinity }} className="w-fit m-auto">
                <FaHelmetSafety className="text-center text-orange-500/40 size-20 mt-40" />
            </motion.div>
            <h2 className="w-full text-center text-white/40 font-mono text-[45px] pt-20">Page currently under developement !</h2>
            <div className="border-t border-white/40 ml-100 mr-100 mt-10"></div>
            <h2 className="w-full text-center text-white/40 font-mono text-[45px] pt-10">We will be back soon</h2>
        </div>
    )
}