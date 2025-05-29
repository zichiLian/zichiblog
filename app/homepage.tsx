import Link from "next/link";


export default function Home() {


    return (

        <div className="home-box min-h-screen " style={{
            gap:'0px'
        }}>
            {/* 顶部导航 */}
            <nav className="px-6 py-4 border-b border-gray-200">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="space-x-6">
                        <Link href='/home' className="text-gray-600 hover:text-black" >首页</Link>
                        <Link href="/leftside/About" className="text-gray-600 hover:text-black">关于</Link>
                        <Link href="/leftside/Links" className="text-gray-600 hover:text-black">友链</Link>
                    </div>
                </div>
            </nav>
            <main className="max-w-4xl mx-auto px-6 py-16">
                <section className="mb-24">
                  <span className="My-name ">怪猫</span>
                    <p className="English-name text-lg text-gray-600 max-w-2xl leading-relaxed"> zichi</p>
                </section>
            </main>

            {/* 页脚 */}
            <footer className="home-footer max-w-4xl mx-auto px-6 py-8 border-t border-gray-100 text-center text-gray-400">
                <p>© {new Date().getFullYear()} 怪猫的博客</p>
                <p>Zichi's Blog</p>
            </footer>
        </div>
    )
}