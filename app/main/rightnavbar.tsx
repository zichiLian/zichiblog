import React from 'react'
import Archives from './right-nav/archives'
import Cate from './right-nav/cate'
import Navtag from "./right-nav/navtag"
import Notice from './right-nav/notice'


export default function Rightnavbar() {
    //
    // const [text,setText] = useState([])
    // useEffect(() => {
    //     fetch('/api/Texts')
    //         .then(response =>{if(!response.ok){
    //             console.log('请求失败')
    //         }
    //             return response.json();
    //         })
    //         .then((response) => {
    //             // const data = []
    //             setText(response.data);
    //
    //         })
    // }, []);

    // for (let i =0; i<text.length; i++) {
    //     const texts = text[i];
    //     console.log(texts)}
    // const result = text
    //     .map((json, index) => {
    //         // 1. 将 JSON 字符串转为对象
    //         const data = JSON.parse(json);
    //
    //         // 2. 提取所需字段
    //         return {
    //             id: data.id,
    //             title: data.title,
    //             tags: data.tags,
    //             time: data.time,
    //             content:data.content,
    //         }
    //
    //     })


    return (

    <>
    <div id ="right-side">
  <div className="container">
      <Notice/>
      <Archives/>
      <Cate/>
      <Navtag/>
      </div>
  </div>
  </>
  )
}
