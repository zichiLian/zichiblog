import React, {useEffect, useState} from 'react';

const Archives = () => {



    const [text,setText] = useState([])
    useEffect(() => {
        fetch('/api/Texts')
            .then(response =>{if(!response.ok){
                console.log('请求失败')
            }
                return response.json();
            })
            .then((response) => {
                // const data = []
                setText(response.data);

            })
    }, []);



    // for (let i =0; i<text.length; i++) {
    //     const texts = text[i];
    //     console.log(texts)}
    const result = text
        .map((json, index) => {
            // 1. 将 JSON 字符串转为对象
            const data = JSON.parse(json);

            // 2. 提取所需字段
            return {
                id: data.id,
                title: data.title,
                tags: data.tags,
                time: data.time
            }

        })


    const allTags = result.flatMap(item => item.tags);//选中所有标签
    const allDate = result.flatMap(item => item.time);//选中所有时间
    const years = allDate.map(dateTime => dateTime.split('-')[0]);//以 ‘-’连接分割数组前的第1位，选中2025
    //时间只选中年份
    const alltitle = result.flatMap(item => item.title);

    const uniqueYears = [...new Set(years)];//标签去重
    const uniqueTags = [...new Set(allTags)];//时间去重


    function buildTagNetwork(result) {
    const network = {};

    // 初始化网络
    result.forEach(item => {
        item.tags.forEach(tag => {
            if (!network[tag]) {
                network[tag] = new Set();
            }
            network[tag].add(item.title);
        });
    });

    return network;
}


    const tagNetwork = buildTagNetwork(result);//对应标签元素的所有文章




    return (
        <>
        <div>
            <h1>{uniqueYears}</h1>
            <div>CATEGORIES</div>
             {uniqueTags.map((tag, id) => (
                <a onClick={()=>{console.log(tagNetwork[`${tag}`])}} href={`/tagspage/${tag}`} key={id} className="archives-tags" >
                    {tag}
                </a>))}
        </div>

         <div>
             {alltitle.map((title, id) => (
                 <a href={`/textpage/${id+1}`} key={id} className="archives-title">
                     {title}
                     <br/></a>))}
         </div>

       </>
    );
};

export default Archives;