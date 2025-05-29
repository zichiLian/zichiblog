import React, { useEffect, useState } from 'react';
import Link from 'next/link';


interface Post {
    id: number;
    title: string;
    content: string;
    formatted_time: string;
}

interface Tag {
    id: number;
    tag: string;
}

export default function Midwindow() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts');
            const result = await response.json();
            setPosts(result.data);
            setTags(result.tags as Tag[]); //以防类型错误
        };
        fetchPosts();
    }, []);



    // const splitTags = (str?: string | null): string[] => {
    //     if (!str) return [];
    //     return str.split(/[｜|]/).map(tag => tag.trim()).filter(Boolean);
    // };
    //
    // const splitTags = (
    //     str: string | null | undefined, // 处理可能空值
    //     separator: RegExp = /[｜]/ // 分隔符正则
    // ): string[] => {
    //     if (!str?.trim()) return []; // 空处理
    //
    //     return str
    //         .split(separator)
    //         .map(tag => tag.trim())
    //         .filter((tag): tag is string => tag !== ""); // 类型过滤
    // };




    // for(let t=0; t<tags.length; t++){
    //     const post_tag =  splitTags(tags[t].tag)
    // }


    return (
        <>
        <div id="fullwindow">
            <div className="container">
                {posts.map((post) => (
                    <div className="book" key={post.id}>
                        <div className="mid-icon">
                            {tags
                                .find(tag => tag.id === post.id) // 根据post.id查找对应tag
                                ?.tag
                                .split(/[｜|]/)
                                .map((part, i) => (
                                    <span key={i}>
                                        {part.trim()}
                                    </span>
                                ))}
                        </div>
                        <Link href={`/textpage/${post.id}`} className="mid-title">
                            {post.title}
                        </Link>
                        <p className="mid-footer">
                            <span>{post.formatted_time}</span>
                        </p>
                    </div>
                ))}
            </div>

            <div className="post-footer">
                <h1 className="footer-title">2024-2025 怪猫的博客</h1>
                <p className="footer-text">Icons from Google's icons</p>
                <p className="footer-text">Build by zichi</p>
            </div>
        </div>
        </>
    );
}