import React, { useState } from 'react';

// 步骤1：定义明确的类型接口
interface PostItem {
    id: number;
    title: string;
    // content: string;  // 如果实际存在可以取消注释
}

// 步骤2：类型化组件props
interface SearchProps {
    allItems?: PostItem[];  // 明确指定数组元素类型
}

export default function Search({ allItems = [] }: SearchProps) {
    const [searchTerm, setSearchTerm] = useState('');

    // 步骤3：类型安全的过滤函数
    const filteredItems = searchTerm
        ? allItems.filter(item => {
            // 使用可选链和空值合并运算符
            const itemName = item.title?.toLowerCase() ?? '';
            return itemName.includes(searchTerm.toLowerCase());
        })
        : [];  // 或根据需求改为显示所有条目

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <form action="/leftside/Archives" className="search-span">
                <input
                    type="text"
                    placeholder="搜索关键词..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
            </form>
            <div className="search-results">
                <ul>
                    {filteredItems.map(item => (
                        <div key={item.id}>
                            <li>
                                <a href={`/textpage/${item.id}`}>{item.title}</a>
                            </li>
                        </div>
                    ))}
                    {searchTerm && filteredItems.length === 0 && (
                        <span className='tips'>找不到 "{searchTerm}"</span>
                    )}
                </ul>
            </div>
        </>
    );
}