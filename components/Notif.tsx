"use client"
import { useEffect } from "react"
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa"

type NotifType = "success" | "error" | "warning"

interface NotifProps {
    display: boolean
    message: string
    type: NotifType
    onClose: () => void
}

export default function Notif({ display, message, type, onClose }: NotifProps) {
    const notifStyles = {
        success: { bg: "bg-green-500/20", text: "text-green-400", icon: <FaCheckCircle size={28} /> },
        error: { bg: "bg-red-500/20", text: "text-red-400", icon: <FaTimesCircle size={28} /> },
        warning: { bg: "bg-yellow-500/20", text: "text-yellow-400", icon: <FaExclamationTriangle size={28} /> },
    }
    const current = notifStyles[type]
    useEffect(() => {
        if (display) {
            const timer = setTimeout(onClose, 5000)
            return () => clearTimeout(timer)
        }
    }, [display, onClose])
    if (!display) return null
    return (
        <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full sm:w-auto">
            <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-3xl border border-gray-600 bg-gradient-to-r from-[#1e1e2f]/90 to-[#2a2a3d]/80 shadow-2xl backdrop-blur-xl">
                <div className={`w-14 h-14 flex items-center justify-center rounded-full ${current.bg} text-white shadow-lg hover:scale-110 transition-transform duration-300`}>{current.icon}</div>
                <div className="flex-1">
                    <p className={`text-sm sm:text-base ${current.text} font-semibold leading-relaxed`}>{message}</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-lg font-bold">✕</button>
            </div>
        </div>
    )
}