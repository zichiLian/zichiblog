import React, {useEffect, useState} from "react";


// @ts-ignore
export function Posttext(params) {
    const [content,setContent] = useState({
        title: '',
        content:'',
        time:'',
        tags:''
    })
    useEffect(() => {
        fetch('/api/postcontent')
            .then(response =>{if(!response.ok){
                console.log('请求失败')
            }
                return response.json();
            })
            .then((response) => {
                // @ts-ignore
                const filterPost = response.data.find(item => item.id === params.id)
                setContent(filterPost)
                console.log(filterPost);
            })
    }, []);
    return (

                     <div className='text_content'>{content.tags}</div>

    )
}