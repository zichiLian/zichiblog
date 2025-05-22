import React, { useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
    content: string;
    formatted_time: string;
    year: number;
    month: number;
    formatted_year_month: string; // 保持与API一致
}

const Post = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [groupedPosts, setGroupedPosts] = useState<Record<number, Record<number, Post[]>>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/time');
                if (!response.ok) throw new Error('请求失败');

                const result = await response.json();
                setPosts(result.data);

                // 按年份和月份分组
                const grouped = result.data.reduce((acc: any, post: Post) => {
                    if (!acc[post.year]) acc[post.year] = {};
                    if (!acc[post.year][post.month]) acc[post.year][post.month] = [];
                    acc[post.year][post.month].push(post);
                    return acc;
                }, {});

                setGroupedPosts(grouped);

            } catch (error) {
                console.error('获取数据失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getMonthName = (month: number) => {
        const months = ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'];
        return months[month - 1] || month;
    };

    if (loading) return <div className="loading">加载中...</div>;

    return (
        <div className="timeline-container">
            {Object.keys(groupedPosts)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map(year => (
                    <div key={year} className="year-section">
                        <h2 className="year-title">{year}年</h2>

                        {Object.keys(groupedPosts[parseInt(year)])
                            .sort((a, b) => parseInt(b) - parseInt(a))
                            .map(month => (
                                <div key={`${year}-${month}`} className="month-section">
                                    <h3 className="month-title">
                                        {getMonthName(parseInt(month))}
                                    </h3>

                                    <div className="posts-list">
                                        {groupedPosts[parseInt(year)][parseInt(month)].map(post => (
                                            <div key={post.id} className="post-item">
                                                <div className="post-header">
                                                    <span className="post-date">{post.formatted_time}</span>
                                                </div>
                                                <h4 className="post-title">{post.title}</h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
        </div>
    );
};

export default Post;