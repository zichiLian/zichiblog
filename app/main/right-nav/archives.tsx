import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import {Button} from 'antd'


interface Post {
    time: number;
    year:string|number
   }

export default function Archives() {
  //
  // const [date,setDate] = useState([])
  //
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
  //             setDate(response.data)
  //           })
  //     },
  //     []);
  //
  //
  // const result = date.map((json, index) => {
  //   // 1. 将 JSON 字符串转为对象
  //   const data = JSON.parse(json);
  //
  //   // 2. 提取所需字段
  //   return {
  //     time: data.time
  //   }
  //
  // })



  const [title, setTitle] = useState<Post[]>([]);




  useEffect(() => {
    const fetchPosts = async () => {

        const response = await fetch('/api/time');

        // 检查HTTP状态码
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error?.message || `HTTP错误! 状态码: ${response.status}`);

        }

        const result = await response.json();

        // 数据格式验证

        setTitle(result.years);
    };

    fetchPosts();
  }, []);


    const time = title.map(item => item.year);


//时间去重；
//   const allDate = result.flatMap(item => item.time);
//   // const uniqueDate = [...new Set(allDate)];
//
//   const years = allDate.map(dateTime => dateTime.split('-')[0]);//以 ‘-’连接分割数组前的第1位，选中2025
//   const uniqueYears = [...new Set(years)];//时间去重

  return (
    <div className="widget-archives">
    <div className="tags-icon"><img src="../icons/links.svg"/></div>
    <h2 className="right-title">ARCHIVES</h2>
    <div className="archives-list">
        {time.map((item, i) => (
    <Button className="tag" key={i}><Link href={`/archive/${item}`}>{item}</Link></Button>))}
    </div>
</div>
  )
}
