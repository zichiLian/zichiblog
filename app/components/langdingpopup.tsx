'use client'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from 'framer-motion'


export default function LandingPopup() {
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        // 检查cookie，24小时内不重复显示
        if (!Cookies.get('landing_shown')) {
            const timer = setTimeout(() => {
                setShowPopup(true)
            }, 1000) // 延迟1秒显示避免布局抖动
            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setShowPopup(false)
        Cookies.set('landing_shown', 'true', { expires: 1 }) // 1天有效期
    }


    if (!showPopup) return null

    return (
        <AnimatePresence>
            {showPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="bg-white p-8 rounded-lg max-w-md mx-4"
                    >
                        <h2 className="text-2xl font-bold mb-4">欢迎访问</h2>
                        <button
                            onClick={() => {
                                Cookies.set('landing_shown', 'true', { expires: 1 })
                                setShowPopup(false)
                            }}
                            className="px-6 py-2 bg-blue-600 text-white rounded"
                        >
                            进入博客
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}