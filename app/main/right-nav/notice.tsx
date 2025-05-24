'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link';

interface BilibiliData {
    mid: number;
    following: number;
    whisper: number;
    black: number;
    follower: number;
}




export default function Notice({userId = 24442474}) {


    // https://api.bilibili.com/x/relation/stat?vmid=24442474
    // 安全转换类型为数组

    const [data, setData] = useState<BilibiliData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/bilibili?vmid=${userId}`);

                if (!response.ok) {
                    throw new Error(`请求失败: ${response.status}`);
                }

                const result = await response.json();

                if (result.code !== 0) {
                    throw new Error(`B站API错误: ${result.message}`);
                }

                setData(result.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) return <div>加载中...</div>;
    if (error) return <div>错误: {error}</div>;
    if (!data) return <div>未获取到数据</div>;

    return (
        <div className="bilibili-stats">
            <a href='https://space.bilibili.com/24442474'>
            <h2>怪猫Maoko</h2>
            <div className="stats-grid">
                <div className="stat-item">
                    <span className="stat-value">{data.follower}</span>
                    <span className="stat-label">粉丝</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{data.following}</span>
                    <span className="stat-label">怪关注</span>
                </div>
            </div>
            </a>
        </div>
    )
}

