import React from 'react';

const About = () => {
    return (
        <>

        <h1 className="about_title">
            关于本站
        </h1>
            <div className="about_card">
                <p>
                这是一个新手测试博客，没什么技术含量的站点
                </p>
                <h1>
                    联系方式：
                </h1>
                <p>邮箱2362982442@qq.com</p>
                <a href='https://space.bilibili.com/24442474' target="_blank" rel="noopener noreferrer">
                    → 点击关注我的哔哩哔哩主页 ←
                </a>
            </div>
        <div className="about_card">
              <h1 className="about_title">关于我</h1>
            <p>
                如你所见，我是一个刚入行的萌新，有什么测试出来的BUG可以尽管联系我
            </p>
            <p>
                友链随时欢迎加入，联系我
            </p>
        </div>
        </>
    );
};

export default About;