'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

declare global {
    interface Window {
        giscusLoaded?: boolean;
    }
}

const GiscusComments = () => {
    const ref = useRef<HTMLDivElement>(null)
    const pathname = usePathname()

    useEffect(() => {
        if (!ref.current || ref.current.hasChildNodes()) return


        if (window.giscusLoaded) return
        window.giscusLoaded = true

        const script = document.createElement('script')
        script.src = 'https://giscus.app/client.js'
        script.async = true
        script.crossOrigin = 'anonymous'


        const term = window.location.pathname + window.location.search

        script.setAttribute('data-repo', 'zichiLian/zichiblog')
        script.setAttribute('data-repo-id', 'R_kgDOOdBLtw')
        script.setAttribute('data-category', 'Announcements')
        script.setAttribute('data-category-id', 'DIC_kwDOOdBLt84CqkfH')
        script.setAttribute('data-mapping', 'pathname')
        script.setAttribute('data-term', term)
        script.setAttribute('data-reactions-enabled', '1')
        script.setAttribute('data-emit-metadata', '0')
        script.setAttribute('data-input-position', 'bottom')
        script.setAttribute('data-lang', 'zh-CN')
        script.setAttribute('data-loading', 'lazy')
        script.setAttribute('data-strict', '0')
        script.setAttribute('data-theme', 'light')

        // 错误处理
        script.onerror = () => {
            console.error('Failed to load giscus widget')
            if (ref.current) {
                ref.current.innerHTML = '<p>评论加载失败，请刷新页面</p>'
            }
        }

        ref.current.appendChild(script)

        return () => {
            if (ref.current) {
                ref.current.innerHTML = ''
                window.giscusLoaded = false
            }
        }
    }, [pathname])

    return <div ref={ref} className="mt-8" />
}

export default GiscusComments