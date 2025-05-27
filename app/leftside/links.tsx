import Link from 'next/link';

export default function LinksPage() {
    const friendLinks = [
        {
            name: '乱序blog',
            url: 'https://luanxu-dev.github.io',
            desc: '乱序的博客',
            avatar: 'https://avatars.githubusercontent.com/u/13693243'
        },

        {
            name: '怪猫的B站',
            url: 'https://space.bilibili.com/24442474',
            desc: '我的B站首页',
            avatar: 'https://avatars.githubusercontent.com/u/202113216'
        },

    ];

    return (
        <>
        <div className="links-container">
            <title>关于大佬们</title>
            <header className="links-header">
                <h1>友情链接</h1>
            </header>

            <div className="links-grid">
                {friendLinks.map((link, index) => (
                    <Link
                            href={link.url}
                        key={index}
                        className="link-card"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="link-avatar">
                            {/* 使用Next.js Image组件优化图片加载 */}
                            <img
                                src={link.avatar}
                                alt={link.name}
                                width={48}
                                height={48}
                                loading="lazy"
                            />
                        </div>
                        <div className="link-content">
                            <h3>{link.name}</h3>
                            <p>{link.desc}</p>
                            <span className="link-url">{new URL(link.url).hostname}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        </>
    );
}