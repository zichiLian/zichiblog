'use client'
import { Outfit } from "next/font/google";
import "./globals.css";
import React from "react";
import { usePathname } from 'next/navigation';

import dynamic from "next/dynamic";
import { useState } from "react";
import { CustomerServiceOutlined, CloseOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';


const geistSans = Outfit({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});


const MetingPlayer = dynamic(
    () => import('@/app/components/metingplayer'),
    {
        ssr: false,
        loading: () => <div className="loading">播放器加载中...</div>
    }
)


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;

}>) {
    const pathname = usePathname();
    const [playerVisible, setPlayerVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);


    const isErrorPage = pathname === '/404' || pathname === '/500' || pathname.startsWith('/_error');

    // 初始化挂载状态
    React.useEffect(() => {
        setIsMounted(true);
    }, []);


    const togglePlayer = () => {
        setPlayerVisible(prev => !prev);
    };

    if (isErrorPage) {
        return <div className="error-layout">{children}</div>;
    }

    return (
        <html lang="en">
        <body
            style={{ background: "var(--background)" }}
            className={`${geistSans.variable} antialiased`}
        >
        <div className="box">
                {children}
        </div>

<div className='antButton'>
        <FloatButton
            shape="circle"
            type={playerVisible ? 'default' : 'primary'}
            style={{
                right: 24,
                bottom:100,
                transform: `scale(${playerVisible ? 0.9 : 1})`,
                transition: 'all 0.3s ease'
            }}
            icon={playerVisible ? <CloseOutlined /> : <CustomerServiceOutlined />}
            onClick={togglePlayer}
            className="player-control-button"
        />
</div>

        {isMounted && (
            <div className={`player-container ${playerVisible ? 'visible' : ''}`}>
                <div className="player-mask" onClick={togglePlayer} />
                <div className="player-content">
                    <MetingPlayer />
                </div>

            </div>
        )}



        </body>
        </html>
    );
}