import React, {useEffect, useState} from 'react';


interface Post {
    id: number;
    title: string;
    content: string;
    formatted_time: string;
}

interface PostProps {
    id?: number | string | string[] | undefined//
}


interface Tags{
    number: React.Key | null | undefined;
    id: number;
    name:string;
}

// 获取参数


const Post = ({ id }: PostProps) => {
    const postid = id

    const [post,setPost] = useState<Post[]>();
    const [tags,setTags] = useState<Tags[]>()   ;



    useEffect(() => {


        const fetchTime = async () => {

            const response = await fetch(`/api/archives?id=${postid}`);

            // 检查HTTP状态码
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP错误! 状态码: ${response.status}`);

            }

            const result = await response.json();
            // 数据格式验证

            setPost(result.posts);
            setTags(result.tags);
        };

        fetchTime();
    }, []);




    // const tagNetwork = buildTagNetwork(result);//对应标签元素的所有文章
    //




    return (
        <div className="box">
        <div id="fullwindow">
        <div className="container">


            {post?.map((post) => (
                <div className="book" key={post.id}>
                    <div className="mid-icon">
                        {tags?.filter(tag => tag.id === post.id) // 使用filter代替find获取全部匹配
                            .flatMap(tag =>
                                tag.name.split(/[｜|]/)
                                    .map(part => part.trim())
                                    .filter(Boolean)
                            )
                            .map((tagName, i) => (
                                <span key={`${post.id}-${i}`} className="tag">
                                     {tagName}
                                     </span>))}
                    </div>
                    <div className="mid-title">{post.title}</div>
                    <p className="mid-footer"><span>{post.formatted_time}</span><span></span></p>

                </div>))}
        </div>
        </div>
        </div>

    );
};

export default Post;