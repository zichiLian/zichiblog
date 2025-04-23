'use client';
import '../../index.css'
import {Post} from "@/app/tagspage/[postid]/post";
import { useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Rightnavbar from "@/app/main/rightnavbar";
import Leftnavbar from "@/app/main/leftnavbar";
import Draws from "@/app/components/quills";



const TagsPage = () => {
    const { postid } = useParams();

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
    const allid = result.flatMap(item=>item.id);

    const alltitle = result.flatMap(item => item.title);

    // console.log(alltitle);


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
    const tagsid = decodeURIComponent(postid);

    //获取当前页面postid 读取对应的标签

    // const textcontent = tagNetwork[`${tagsid}`];

    const textcontent = tagNetwork && tagNetwork[tagsid] &&
    (tagNetwork[tagsid] instanceof Set || Array.isArray(tagNetwork[tagsid]))
        ? [...tagNetwork[tagsid]]
        : [];
    //因为渲染问题，有可能会变成空数组，防御性提取数据
    function findIdByTitle(title) {
        const article = result.find(item => item.title === title);
        return article ? article.id : null;   //函数内找到对应result中的对应title位置对应的字符串，找不到返回null

    }

    const textid = [];//设置空数组容纳以下数据

for (const item of textcontent){
    const articleId = findIdByTitle(item);//用textcontent里对应title文字来获取ID
    textid.push(articleId);//循环取出result里，对应文章title的id，加入textid数组
}


    // const articleId = findIdByTitle(titleToFind);


// console.log(articleId);
    // const texttitle = [...tagNetwork[`${tagsid}`]];//转为数组
    //  const texttitle = [...textcontent]
    const textArray = textcontent.map((text, index) => ({
        id: textid[index],
        content: text
    }));


    return (

            <div className="box">
                <Leftnavbar/>
                <div id="fullwindow">
                    <div className="container">
                        <div className="book">
                            <div>
                                <h1>{uniqueYears}</h1>
                                <div>CATEGORIES</div>
                                {uniqueTags.map((tag, id) => (
                                    <a onClick={()=>{console.log(tagNetwork[`${tag}`])}} href={`/tagspage/${tag}`} key={id} className="archives-tags" >
                                        {tag}
                                    </a>))}
                                <div>
                                    {textArray.map((item) => (
                                        <Link href={`/textpage/${item.id}`} key={item.id} className="archives-tags" >
                                            {item.content}
                                            <br/></Link>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Rightnavbar/>
                <Draws/>
            </div>
    );
};

export default TagsPage;
