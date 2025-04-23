import {useAuth} from "@/app/hooks/useAuth";
import React, {useEffect, useState} from "react";
import fs from "node:fs";
import {useRouter} from "next/navigation";
import Update from "@/app/components/update";
import Link from "next/link";
import {useParams} from "next/navigation";




interface Post {
    id: number;
    title: string;
    content: string;
    formatted_time: string;
}

interface Tags{
    id: number;
    name:string;
}





    export function Post( params: { id: any; }){
    const postid = params.id


    const auth=useAuth();
//用params链接page页
    const [tags, setTags] = useState<Tags[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 安全转换类型为数组

    useEffect(() => {
        const fetchPosts = async () => {
                setLoading(true);
                setError(null);

                const response = await fetch(`/api/posttext?id=${params.id}`);

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

    const router = useRouter();

    const handleClick = () => {
            if(auth){
            fetch('/api/delete', {
            method: 'POST',
            body: JSON.stringify(params),
            //发送请求，类型为post类型，内容为obj，发送时将json格式的obj转换为字符串string类型。
            //将QuillRef数据下的innerHTML发送
        });
         router.push('/');
             }else{
                 console.log('请先登录')
             }
            //发送请求，类型为post类型，内容为obj，发送时将json格式的obj转换为字符串string类型。
            //将QuillRef数据下的innerHTML发送
        }
        // .then(res => res.json())
        // .then(data => setGetid(data))//useState方法取出data
    //思路：我们构建了一个手动维护的文件夹，利用该文件找到所有文章文件的名字，再调用其中对应的文章名的文章，tags，文章，id信息。
    // fetch(`/api/posttext?id=${params.id}`) //将pramas.id 这个参数发送到后端api，让API用到这个参数



    return (
        <div className="box">
            <div id="fullwindow">
                <div className="container">
                    {posts.map((post) => (
                        <div className="book" key = {post.id}>
                            <div className="mid-icon"><span></span><span></span></div>
                            <div className="mid-title">{post.title}</div>
                            <p className="mid-footer"><span>{post.formatted_time}</span><span></span></p>
                            <div className="textpan">
                                <div className="texttitle"><p>{post.title}</p></div>
                                <div className="textcontent">
                                    <p>{post.content}</p>
                                </div>
                            </div>
                            { auth &&  <button onClick={handleClick}>删除这篇</button> }
                            { auth && <Update id={postid}/>}
                        </div>))}
                </div>
            </div>
        </div>
    )
}
