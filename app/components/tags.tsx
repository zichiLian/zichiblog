import React, {useEffect, useRef, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Flex, Input, Tag, theme, Tooltip} from 'antd';
import Draws from './quills';

const tagInputStyle = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
};
const posttag = (props: { onTagChange: (arg0: never[]) => void; }) => {
    const { token } = theme.useToken();
    const [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);
    useEffect(() => {
        props.onTagChange(tags)
    }, [tags]);



    useEffect(() => {
        if (inputVisible) {
            // @ts-ignore
            inputRef.current?.focus();
        }
    }, [inputVisible]);
    useEffect(() => {
        // @ts-ignore
        editInputRef.current?.focus();
    }, [editInputValue]);
    const handleClose = ({removedTag}: { removedTag: any }) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };
    const showInput = () => {
        setInputVisible(true);
    };
    const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(e.target.value);
    };
    const handleInputConfirm = () => {
        // @ts-ignore
        if (inputValue && !tags.includes(inputValue)) {
            // @ts-ignore
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };
    const handleEditInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEditInputValue(e.target.value);
    };
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        // @ts-ignore
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        setEditInputIndex(-1);
        setEditInputValue('');

    };
    const tagPlusStyle = {
        height: 22,
        background: token.colorBgContainer,
        borderStyle: 'dashed',

    };


    const savetag = [...tags]


    return (
        <Flex gap="4px 0" wrap>
            {tags.map((tag, index) => {
                if (editInputIndex === index) {
                    return (
                        <Input
                            ref={editInputRef}
                            key={tag}
                            size="small"
                            style={tagInputStyle}
                            value={editInputValue}
                            onChange={handleEditInputChange}
                            onBlur={handleEditInputConfirm}
                            onPressEnter={handleEditInputConfirm}
                        />
                    );
                }
                const {length, slice} = tag;
                const isLongTag = length > 20;
                // @ts-ignore
                const tagElem = (
                    <Tag
                        key={tag}
                        closable={index !== 0}
                        style={{
                            userSelect: 'none',
                        }}
                        onClose={() => handleClose({removedTag: tag})}
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
            })}
            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={tagInputStyle}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
                    New Tag
                </Tag>
            )}
            <Draws savetag={savetag} />
        </Flex>

    );

};
//新标签内容为Newtags
export default posttag;