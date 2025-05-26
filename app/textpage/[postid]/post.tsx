import { useAuth } from "@/app/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Update from "@/app/components/update";
import GiscusSimple from '@/app/components/giscus';

interface Post {
    id: number;
    title: string;
    content: string;
    formatted_time: string;
}

interface Tag {
    number: number;
    id: number;
    name: string;
}

export function Post({ id: postId }: { id: string }) {
    const auth = useAuth();
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/api/posttext?id=${postId}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `请求失败，状态码: ${response.status}`);
                }

                const result = await response.json();

                if (!result.success || !result.data) {
                    throw new Error('无效的API响应格式');
                }

                setPost(result.data);
                setTags(result.tags || []);

            } catch (err) {
                setError(err instanceof Error ? err.message : '获取文章失败');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    const handleDelete = async () => {
        if (!auth?.isAdmin) {
            console.log('请先登录');
            return;
        }

        try {
            const response = await fetch('/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: postId }),
            });

            if (!response.ok) {
                throw new Error('删除失败');
            }

            router.push('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : '删除操作失败');
        }
    };


    return (
        <div className="box">
            <div id="fullwindow">
                <div className="container">
                    {post && ( // 保留这个条件渲染确保类型安全
                        <div className="book" key={post.id}>
                            <div className="mid-icon">
                                {tags.map((tag) => (
                                    <span key={`${tag.id}-${tag.number}`} className="tag">
                    {tag.name}
                  </span>
                                ))}
                            </div>
                            <div className="mid-title">{post.title}</div>
                            <p className="mid-footer">
                                <span>{post.formatted_time}</span>
                            </p>
                            <div className="textpan">
                                <div className="texttitle">
                                    <p>{post.title}</p>
                                </div>
                                <div
                                    className="textcontent"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            </div>

                            {auth?.isAdmin && !auth.isLoading && (
                                <div className="mt-4 space-x-4">
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-500 text-white rounded"
                                    >
                                        删除这篇
                                    </button>
                                    <Update id={Number(postId)} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <GiscusSimple />
            </div>
        </div>
    );
}