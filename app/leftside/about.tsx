import React from 'react';
import '@/app/index.css'; // 假设样式保存在这个文件

const About = () => {
    return (
        <div className="about_container">
            <h1 className="about_title">
                关于本站
            </h1>

            <div className="about_card">
                <p>
                    这是一个新手测试博客,没什么技术含量的站点,但充满学习热情和进步空间。
                </p>
                <h1>联系方式：</h1>
                <p>邮箱: <a href="mailto:2362982442@qq.com">2362982442@qq.com</a></p>
                <p>
                    <a href='https://space.bilibili.com/24442474' target="_blank" rel="noopener noreferrer">
                        → 点击关注我的哔哩哔哩 ←
                    </a>
                </p>
            </div>

            <div className="about_card">
                <h1 className="about_title">关于我</h1>
                <p>
                    如你所见，我是一个刚入行的萌新开发者，
                    如果你发现任何问题或BUG，欢迎随时联系我反馈。
                </p>
                <p>
                    友链交换随时欢迎联系
                </p>
            </div>
        </div>
    );
};

export default About;