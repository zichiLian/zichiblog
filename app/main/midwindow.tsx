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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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

    return (
        <div id="fullwindow">
            <div className="container">
                {posts.map((post, index) => (
                    <div className="book" key={post.id}>
                        <div className="mid-icon">
              <span>
                {/* 添加可选链操作符和类型转换 */}
                  {(tags[index]?.tag || '')
                      .split('｜')
                      .map((part: string, i: number) => (
                          <span key={i} className="tag-part">
                      {part}
                    </span>
                      ))}
              </span>
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
    );
}