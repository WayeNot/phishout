"use client"

import { GrTools } from "react-icons/gr";
import { motion } from "motion/react";

export default function Home() {
    return (
        <div>
            <motion.div animate={{ rotate: [0, -30, 5] }} transition={{ duration: 3, repeat: Infinity }} className="w-fit m-auto">
                <GrTools className="text-center text-white/40 size-20 mt-40" />
            </motion.div>
            <h2 className="w-full text-center text-white/40 font-mono text-[45px] pt-20">We are currently undergoing maintenance</h2>
            <div className="border-t border-white/40 ml-100 mr-100 mt-10"></div>
            <h2 className="w-full text-center text-white/40 font-mono text-[45px] pt-10">We will be back soon</h2>
        </div>
    )
}