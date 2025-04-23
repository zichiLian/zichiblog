import React, {useEffect, useState} from 'react'


interface Post {
  id: number;
  name: string;}

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

        setTags(result.data);

    };

    fetchPosts();
  }, []);



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
    <div className="archives-year"><a href={`/leftside/Archives`}>2025</a></div>
    </div>
</div>
  )
}
