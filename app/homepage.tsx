import Link from "next/link";
import {useState} from "react";


export default function Home() {

    return (

        <div className="min-h-screen bg-white">
            {/* 顶部导航 */}
            <nav className="px-6 py-4 border-b border-gray-100">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <span className="text-xl font-light">个人博客</span>
                    <div className="space-x-6">
                        <Link href="/about" className="text-gray-600 hover:text-black">关于</Link>
                        <Link href="/Link" className="text-gray-600 hover:text-black">友链</Link>
                    </div>
                </div>
            </nav>

            {/* 主内容区 */}
            <main className="max-w-4xl mx-auto px-6 py-16">
                <section className="mb-24">
                  <span className="font-medium">怪猫</span>
                    <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                        zichi
                    </p>
                </section>
            </main>
            <Link href='/home'>进入博客</Link>

            {/* 页脚 */}
            <footer className="max-w-4xl mx-auto px-6 py-8 border-t border-gray-100 text-center text-gray-400">
                <p>© {new Date().getFullYear()} 怪猫的博客</p>
                <p>Zichi's Blog</p>
            </footer>
        </div>
    )
}