import React, {useEffect, useState} from 'react';

import { useRouter } from 'next/router';

interface Timedata {
    time?: string // 允许空值和undefined
}

interface Post {
    id: number;
    title: string;
    content: string;
    formatted_time: string;
}

interface PostProps {
    id: number | string; // 明确声明id属性
}

interface Tags{
    number: React.Key | null | undefined;
    id: number;
    name:string;
}

// 获取参数


const Post = ({ id }: PostProps) => {


    const [post,setPost] = useState<Post[]>();
    const [time,setTime] = useState<Timedata[]>();
    const [tags,setTags] = useState<Tags[]>()   ;



    useEffect(() => {


        const fetchTime = async () => {

            const response = await fetch('/api/time');

            // 检查HTTP状态码
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP错误! 状态码: ${response.status}`);

            }

            const result = await response.json();
            // 数据格式验证

            setTime(result.data);
        };

        fetchTime();
    }, []);

    const UniqueYears = (data: Timedata[] | undefined): number[] => {
        // 1. 数据校验 + 类型转换
        if (!data) return [];

        const years = data
            .filter((item): item is { time: string } =>
                typeof item.time === 'string' &&
                /^\d{4}$/.test(item.time) // 正则验证4位数字
            )
            .map(item => parseInt(item.time, 10))
            .filter(year =>
                !isNaN(year)
            );

        return [...new Set(years)]
            .sort((a, b) => b - a); // 降序排列
    };

    const years = UniqueYears(time);

    useEffect(() => {
        // 设置默认年份（如当前年份）
        const defaultYear = new Date().getFullYear();
        handleClick(id);
    }, []);

    // const tagNetwork = buildTagNetwork(result);//对应标签元素的所有文章
    //
    const handleClick = (year: string | number) => {

        const fetchPosts = async () => {
            const response = await fetch(`/api/test?id=${year}`);

            // 检查HTTP状态码
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP错误! 状态码: ${response.status}`);
            }

            const result = await response.json();

            // 数据格式验证
            if (!Array.isArray(result?.posts)) {
                throw new Error('无效的数据格式');
            }

            setPost(result.posts);
            setTags(result.tags);


        };fetchPosts()

    }



    return (
        <div className="box">
        <div id="fullwindow">
        <div className="container">
            {years.map((year, index) => (
                <span key={index}
                      className="year-span"
                      onClick={() => handleClick(year)}
                >
                        {year}</span>
            ))}

            {post?.map((post) => (
                <div className="book" key={post.id}>
                    <div className="mid-icon">
                        {tags?.filter(tag => tag.id === post.id) // 使用filter代替find获取全部匹配
                            .flatMap(tag =>
                                tag.name.split(/[｜|]/)
                                    .map(part => part.trim())
                                    .filter(Boolean)
                            )
                            .map((tagName, i) => (
                                <span key={`${post.id}-${i}`} className="tag">
                                     {tagName}
                                     </span>))}
                    </div>
                    <div className="mid-title">{post.title}</div>
                    <p className="mid-footer"><span>{post.formatted_time}</span><span></span></p>

                </div>))}
        </div>
        </div>
        </div>

    );
};

export default Post;