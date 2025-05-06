import React, {useEffect, useState} from "react";
import Update from "@/app/components/update";
import Link from "next/link";


interface Post {
    id: number;
    title: string;
    content: string;
    formatted_time: string;
}

interface Tags{
    number: React.Key | null | undefined;
    id: number;
    name:string;
}




// @ts-ignore
export function Post(params) {
//params.id为当前页面的名字
    const postid = params.id;
    const title = decodeURIComponent(postid); //解码

    const [tags, setTags] = useState<Tags[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);



    useEffect(() => {

        const fetchPosts = async () => {

            const response = await fetch(`/api/tagspage?id=${postid}`);

            // 检查HTTP状态码
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP错误! 状态码: ${response.status}`);
            }

            const result = await response.json();

            // 数据格式验证
            if (!Array.isArray(result?.data)) {
                throw new Error('无效的数据格式');
            }

            setPosts(result.data);

        };


        fetchPosts();
    }, []);


    return (
        <div className="box">
            <div id="fullwindow">
                <div className="container">
                    <div className="tagspage"> “{`${title}`}” 的相关文章</div>
                    {posts.map(post => (
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
            </div>
            </div>
    )
}