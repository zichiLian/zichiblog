'use client'
import { usePathname } from 'next/navigation';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { CustomerServiceOutlined, CloseOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import Leftnavbar from "@/app/main/leftnavbar";
import Rightnavbar from "@/app/main/rightnavbar";


const MetingPlayer = dynamic(
    () => import('@/app/components/metingplayer'),
    { ssr: false }
)

const Draws = dynamic(
    () => import('@/app/components/quills'),
    { ssr: false }
)

export default function ClientLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [playerVisible, setPlayerVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const isHomepage = pathname === '/' || pathname === '/500' || pathname?.startsWith('/_error') || pathname === '/404'|| pathname === '*  ';
    const isright =
        pathname === '/home' || pathname === '/leftside/Archives' || pathname === '/leftside/Categories' ||
        pathname?.startsWith('/archive') || pathname?.startsWith('/categories') || pathname?.startsWith('/tagspage');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const togglePlayer = () => {
        setPlayerVisible(prev => !prev);
    };

    if (pathname === '/404' || pathname === '/500' || pathname?.startsWith('/_error')) {
        return <div className="error-layout">{children}</div>;
    }

    return (
        <div style={{ background: "var(--background)" }} className="box">
            {!isHomepage && <Leftnavbar /> }
            {children}
            {isright && <Rightnavbar /> }
            <Draws/>
            {isMounted && (
                <div className={`player-container ${playerVisible ? 'visible' : ''}`}>
                    <div className="player-mask" onClick={togglePlayer} />
                    <div className="player-content">
                        <MetingPlayer/>
                    </div>
                </div>
            )}

            <div className='antButton'>
                <FloatButton
                    shape="circle"
                    type={playerVisible ? 'default' : 'primary'}
                    style={{
                        right: 24,
                        bottom: 100,
                        transform: `scale(${playerVisible ? 0.9 : 1})`,
                        transition: 'all 0.3s ease'
                    }}
                    icon={playerVisible ? <CloseOutlined /> : <CustomerServiceOutlined />}
                    onClick={togglePlayer}
                />
            </div>

        </div>

    );
}