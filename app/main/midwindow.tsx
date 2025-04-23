import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
    id: number;
    title: string;
    content: string;
    formatted_time: string;
}

export default function Midwindow() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 安全转换类型为数组

    

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/posts');

                // 检查HTTP状态码

                const result = await response.json();

                // 数据格式验证
                if (!Array.isArray(result?.data)) {
                    throw new Error('无效的数据格式');
                }

                setPosts(result.data);

            }  finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div id="fullwindow">
            <div className="container">
                {posts.map((post) => (
                    <div className="book" key={post.id}>
                        <div className="mid-icon">

                        </div>
                        <Link href={`/textpage/${post.id}`}>
                            <div className="mid-title">{post.title}</div>
                        </Link>
                        <p className="mid-footer">
                            <span>{post.formatted_time}</span>
                        </p>
                    </div>
                ))}
            </div>


                        <div className="page"><span>1</span></div>
                        <div className="footer">
                            <h1 className="footer-title">2024-2025 怪猫的博客</h1>
                            <p className="footer-text">Icons form Google's icons</p>
                            <p className="footer-text">Build by zichi</p>
                        </div>
                    </div>
        )
    }
