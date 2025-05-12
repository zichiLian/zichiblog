// context/PlayerContext.tsx
'use client'

import { createContext, useContext, useState, useCallback } from 'react'

type PlayerContextType = {
    url: string
    setUrl: (url: string) => void
    togglePlay: () => void
    playing: boolean
}

// 提供安全的默认值
const PlayerContext = createContext<PlayerContextType>({
    url: '',
    setUrl: () => console.warn('Provider未初始化'),
    togglePlay: () => console.warn('Provider未初始化'),
    playing: false
})

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [url, setUrl] = useState('')
    const [playing, setPlaying] = useState(false)

    const togglePlay = useCallback(() => {
        setPlaying(p => !p)
    }, [])

    return (
        <PlayerContext.Provider
            value={{
                url,
                setUrl,
                togglePlay,
                playing
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

// 添加安全访问检查
export const usePlayer = () => {
    const context = useContext(PlayerContext)
    if (!context) {
        throw new Error('usePlayer 必须在 PlayerProvider 内使用')
    }
    return context
}