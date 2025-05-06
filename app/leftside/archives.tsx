import React, {useEffect, useState} from 'react';
import Link from "next/link";

const Archives = () => {

    const [time,setTime] = useState();

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

            setTime(result.time);

        };

        fetchPosts();
    }, []);

   console.log(time);






    // const tagNetwork = buildTagNetwork(result);//对应标签元素的所有文章
    //



    return (
            <div className="container">

                        <div className="mid-icon">


                        </div>
                        <Link href={`/textpage/`}>
                            <div className="mid-title"></div>
                        </Link>
                        <p className="mid-footer">

                        </p>

            </div>
    );
};

export default Archives;