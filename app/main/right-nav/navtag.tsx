'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link';


interface Post {
    number: React.Key | null | undefined;
    id: number;
    name: string;}

export default function Navtag() {

  //
  // useEffect(() => {
  //       fetch('/api/tags')
  //
  //
  //           .then(response =>{if(!response.ok){
  //             console.log('请求失败')
  //           }
  //             return response.json();
  //           })
  //           .then((response) => {
  //             setTags(response.data)
  //           })
  //     },
  //     []);

    //
    //
    // const result = tags.map((json, index) => {
    //         // 1. 将 JSON 字符串转为对象
    //         const data = JSON.parse(json);
    //
    //         // 2. 提取所需字段
    //         return {
    //             id: data.id,
    //             tags: data.tags,
    //             time: data.time
    //         }
    //
    //     })


//标签去重；
//     const allTags = result.flatMap(item => item.tags);
    // const uniqueTags = [...new Set(allTags)];

    // console.log(uniqueTags);


    const [tags, setTags] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 安全转换类型为数组


    useEffect(() => {
        const fetchPosts = async () => {


                setLoading(true);
                setError(null);

                const response = await fetch('/api/tags');

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

                setTags(result.data);

        };

        fetchPosts();
    }, []);

    const allTags = tags.flatMap(item => item.name);
    const uniqueTags = [...new Set(allTags)];



    return (
    <div className="widget-Tags">
    <div className="tags-icon"><img src="../icons/archives.svg"/></div>
    <h2 className="right-title">TAGS</h2>
    <div className="tags">
        {/*{tags.map((post) => (*/}
        {/*    <a key={post.number} className="tag" href={`/tagspage/${post.name}`}>*/}
        {/*        {post.name}*/}
        {/*    </a>))}*/}
        {uniqueTags.map((post,i)=> (
            <Link  key={i} href={`/tagspage/${post}`} className="tag" >
                {post}
            </Link>))}
    </div>
    </div>
  )
}
