'use client'

import { useEffect } from 'react'

export default function MetingPlayer() {
    useEffect(() => {
        const loadScripts = async () => {
            // 动态加载CSS
            const css = document.createElement('link')
            css.rel = 'stylesheet'
            css.href = 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css'
            document.head.appendChild(css)

            // 并行加载JS
            await Promise.all([
                loadScript('https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js'),
                loadScript('https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js')
            ])

            // 初始化Meting（需要类型断言）
            ;(window as typeof window & { MetingJS: any }).MetingJS?.init()
        }

        const loadScript = (src: string) =>
            new Promise((resolve, reject) => {
                const script = document.createElement('script')
                script.src = src
                script.onload = resolve
                script.onerror = reject
                document.body.appendChild(script)
            })

        loadScripts()
    }, [])


    return (
        // @ts-ignore
        <meting-js
            server="netease"
            type="playlist"
            list-Folded="false"
            id="13715590902"
            data-lrc-type="3"
            theme="#25b864"

        />
    )
}