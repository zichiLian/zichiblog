import React, { useEffect, useState } from 'react';

interface TimeData {
    year: number;
    month: number;
    formatted_year_month: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    formatted_time: string;
}

interface Tag {
    id: number;
    name: string;
    number: React.Key | null | undefined;
    post_id: number;
}

const Post = () => {
    const [timeData, setTimeData] = useState<TimeData[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedYearMonth, setSelectedYearMonth] = useState<string>('');
    const [loading, setLoading] = useState(true);

    // 获取所有年月数据
    useEffect(() => {
        const fetchTimeData = async () => {
            try {
                const response = await fetch('/api/time');
                if (!response.ok) {
                    throw new Error(`HTTP错误! 状态码: ${response.status}`);
                }
                const result = await response.json();
                setTimeData(result.data);

                // 默认选择最新的年月
                if (result.data.length > 0) {
                    setSelectedYearMonth(result.data[0].formatted_year_month);
                }
            } catch (error) {
                console.error('获取时间数据失败:', error);
            }
        };
        fetchTimeData();
    }, []);

    // 根据选中的年月获取文章
    useEffect(() => {
        if (!selectedYearMonth) return;

        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/test?id=${selectedYearMonth}`);
                if (!response.ok) {
                    throw new Error(`HTTP错误! 状态码: ${response.status}`);
                }
                const result = await response.json();
                setPosts(result.posts);
                setTags(result.tags);
            } catch (error) {
                console.error('获取文章失败:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [selectedYearMonth]);

    // 按年份分组月份
    const groupedByYear = timeData.reduce((acc, item) => {
        if (!acc[item.year]) acc[item.year] = [];
        acc[item.year].push(item);
        return acc;
    }, {} as Record<number, TimeData[]>);

    // 获取月份名称
    const getMonthName = (month: number) => {
        const months = ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'];
        return months[month - 1] || month;
    };

    if (loading && !posts.length) return <div>加载中...</div>;

    return (
        <div className="box">
            <div id="fullwindow">
                <div className="container">
                    {/* 时间轴导航 */}
                    <div className="timeline-nav">
                        {Object.keys(groupedByYear)
                            .sort((a, b) => parseInt(b) - parseInt(a))
                            .map(year => (
                                <div key={year} className="year-section">
                                    <h2 className="year-heading">{year}年</h2>
                                    <div className="month-list">
                                        {groupedByYear[parseInt(year)]
                                            .sort((a, b) => b.month - a.month)
                                            .map(monthData => (
                                                <button
                                                    key={monthData.formatted_year_month}
                                                    className={`month-btn ${selectedYearMonth === monthData.formatted_year_month ? 'active' : ''}`}
                                                    onClick={() => setSelectedYearMonth(monthData.formatted_year_month)}
                                                >
                                                    {getMonthName(monthData.month)}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* 文章列表 */}
                    <div className="posts-container">
                        {posts.map(post => (
                            <div className="book" key={post.id}>
                                <div className="mid-icon">
                                    {tags
                                        .filter(tag => tag.post_id === post.id)
                                        .map(tag => (
                                            <span key={`${post.id}-${tag.id}`} className="tag">
                                                {tag.name}
                                            </span>
                                        ))}
                                </div>
                                <div className="mid-title">{post.title}</div>
                                <p className="mid-footer">
                                    <span>{post.formatted_time}</span>
                                </p>
                                <div className="mid-content">{post.content}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;