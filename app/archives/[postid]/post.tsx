import React, { useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
    content?: string;
    time: string;
    year?: number;
    month?: number;
    formatted_time?: string;
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

                // 处理数据：从result.data或result.posts获取文章数据
                const postsData = result.posts?.length > 0 ? result.posts : result.data;

                // 为每篇文章添加year和month字段
                const processedPosts = postsData.map((post: Post) => {
                    const date = new Date(post.time);
                    return {
                        ...post,
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        formatted_time: formatDate(post.time) // 格式化日期函数
                    };
                });

                setPosts(processedPosts);

                // 按年份和月份分组
                const grouped = processedPosts.reduce((acc: any, post: Post) => {
                    if (!post.year || !post.month) return acc;

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

    // 日期格式化函数
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    };

    const getMonthName = (month: number) => {
        const months = ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'];
        return months[month - 1] || month;
    };

    if (loading) return <div className="loading">加载中...</div>;

    return (
        <div className="timeline-container">
            {Object.keys(groupedPosts)
                .filter(year => year !== "undefined") // 过滤掉undefined
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map(year => (
                    <div key={year} className="year-section">
                        <h2 className="year-title">{year}年</h2>

                        {Object.keys(groupedPosts[parseInt(year)])
                            .filter(month => month !== "undefined") // 过滤掉undefined
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
                                                {post.content && <p className="post-content">{post.content}</p>}
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