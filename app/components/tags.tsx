import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Flex, Input, Tag, theme, Tooltip } from 'antd';
import Draws from './quills';

const tagInputStyle = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
};

// 修复1: 完善类型定义
const PostTag = (props: { onTagChange: (tags: string[]) => void }) => {
    const { token } = theme.useToken();
    const [tags, setTags] = useState<string[]>([]); // 明确类型为字符串数组
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        props.onTagChange(tags);
    }, [tags]);

    // 自动聚焦逻辑
    useEffect(() => {
        if (inputVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        if (editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editInputValue]);

    // 标签关闭处理
    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    // 输入确认处理（修复2: 添加trim处理）
    const handleInput = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !tags.includes(trimmedValue)) {
            setTags([...tags, trimmedValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    // 标签渲染部分（关键修复3: 添加标签文本）
    const renderTag = (tag: string, index: number) => {
        if (editInputIndex === index) {
            return (
                <Input
                    // @ts-ignore
                    ref={editInputRef}
                    key={tag}
                    size="small"
                    style={tagInputStyle}
                    value={editInputValue}
                    onChange={(e) => setEditInputValue(e.target.value)}
                    onBlur={handleInput}
                    onPressEnter={handleInput}
                />
            );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
            <Tag
                key={tag}
                closable={index !== 0}
                style={{ userSelect: 'none' }}
                onClose={() => handleClose(tag)}
            >
        <span
            onDoubleClick={(e) => {
                if (index !== 0) {
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    e.preventDefault();
                }
            }}
        >
          {tag} {/* 关键修复：显示标签文本 */}
        </span>
            </Tag>
        );

        return isLongTag ? (
            <Tooltip title={tag} key={tag}>
                {tagElem}
            </Tooltip>
        ) : (
            tagElem
        );
    };


    return (
        <Flex gap="4px 0" wrap>
            {tags.map(renderTag)}
            {inputVisible ? (
                <Input
                    // @ts-ignore
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={tagInputStyle}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleInput}
                    onPressEnter={handleInput}
                />
            ) : (
                <Tag
                    style={{
                        height: 22,
                        background: token.colorBgContainer,
                        borderStyle: 'dashed',
                    }}
                    icon={<PlusOutlined />}
                    onClick={() => setInputVisible(true)}
                >
                    New Tag
                </Tag>
            )}
            <Draws savetag={tags} />
        </Flex>
    );
};

export default PostTag;