import React, { useEffect, useState } from 'react';
import Link from "next/link";

interface Post {
    id: number;
    name: string;
   number: number;
}

const Post = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/cate');
                if (!response.ok) throw new Error('请求失败');

                const result = await response.json();
                setPosts(result.data);
            } catch (error) {
                console.error('获取数据失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) return <div className="loading">加载中...</div>;

    return (
        <>
        {posts.map((post: Post) => (

        <div key={post.id} className="cate-container">
           <Link className='cate-card' href={`/categories/${post.name}`}> {post.name}</Link>
        </div>
))}
            </>
    );
};

export default Post;