// components/GlobalPlayer.tsx
'use client'

import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { usePathname } from 'next/navigation'
import {usePlayer} from "@/app/context/playercontext";



export default function Mp3Player() {
    const { setUrl, togglePlay } = usePlayer()

    const [playerState, setPlayerState] = useState({
        url: '',
        playing: false,
        volume: 0.8,
        played: 0
    })

    // 监听路由变化但不销毁组件
    const pathname = usePathname()

    // 保存状态到 localStorage
    useEffect(() => {
        const savedState = localStorage.getItem('playerState')
        if (savedState) {
            setPlayerState(JSON.parse(savedState))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('playerState', JSON.stringify(playerState))
    }, [playerState])

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
            <button
                onClick={() => {
                    setUrl('/music/song1.mp3')
                    togglePlay()
                }}
            >
                播放歌曲1
            </button>
            <ReactPlayer
                url={playerState.url}
                playing={playerState.playing}
                volume={playerState.volume}
                onPlay={() => setPlayerState(p => ({ ...p, playing: true }))}
                onPause={() => setPlayerState(p => ({ ...p, playing: false }))}
                onProgress={({ played }) =>
                    setPlayerState(p => ({ ...p, played }))
                }
            />

            <div className="controls mt-2">
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={playerState.volume}
                    onChange={e =>
                        setPlayerState(p => ({
                            ...p,
                            volume: parseFloat(e.target.value)
                        }))
                    }
                />
            </div>

        </div>
    )
}