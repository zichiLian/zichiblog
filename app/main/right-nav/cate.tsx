'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link';

interface Post {
    number: React.Key | null | undefined;
    id: number;
    name: string;}
export default function GET() {

  // const [tags,setTags] = useState([])
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
  //
  //   const result = tags.map((json, index) => {
  //       // 1. 将 JSON 字符串转为对象
  //       const data = JSON.parse(json);
  //
  //       // 2. 提取所需字段
  //       return {
  //           id: data.id,
  //           tags: data.tags,
  //           time: data.time
  //       }
  //
  //   })


    const [tags, setTags] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 安全转换类型为数组


    useEffect(() => {
        const fetchPosts = async () => {

                setLoading(true);
                setError(null);

                const response = await fetch('/api/cate');

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


//标签去重；
    const allTags = tags.flatMap(item => item.name);
    const uniqueTags = [...new Set(allTags)];



  return (
    <div className="widget-categories">
    <div className="tags-icon"><img src="../icons/hourglass_empty_24dp_1F1F1F.svg"/></div>
    <h2 className="right-title">CATEGORIES</h2>
    <div className="tags">
        {uniqueTags.map((post,i)=> (
            <Link className="tag" key={i} href={`/Categories/${post}`}>
                {post}
            </Link>))}
</div>
</div>
  )
}

