'use client'
import React, { useEffect, useRef, useState, forwardRef, useCallback } from "react";
import Quill, { Delta } from "quill";
import 'quill/dist/quill.snow.css';
import { ConfigProvider, Space, notification, Button, Modal } from 'antd';
import { FloatButton } from 'antd';
import Posttag from "@/app/components/tags";
import { useAuth } from "@/app/hooks/useAuth";
import {useParams} from "next/navigation";

interface Post {
    id: number;
    title: string | number;
    content: string ;
    formatted_time: string;
}

interface postid{
    id: number;
    children:string;
}


// 类型扩展声明
declare module 'quill' {
    interface Quill {
        root: HTMLElement;
    }
}

// 定义 Editor 组件 props 类型
interface EditorProps {
    defaultValue?: Delta;
}

// 使用 forwardRef 的 Editor 组件
const Editor = forwardRef<Quill, EditorProps>(({ defaultValue }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && !(ref as React.MutableRefObject<Quill | null>).current) {
            const quill = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        ['code-block', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                        ['clean']
                    ]
                }
            });

            if (defaultValue) {
                quill.setContents(defaultValue);
            }

            (ref as React.MutableRefObject<Quill | null>).current = quill;
        }
    }, [defaultValue, ref]);

    return <div ref={editorRef} />;
});

Editor.displayName = 'Editor';

interface Postid{
    id:number;
}

const Update = (postid:Postid) => {
    const post = postid.id;

    const quillRef = useRef<Quill | null>(null);
    const quilltitle = useRef<HTMLDivElement>(null);
    const [posts, setPosts] = useState<Post>({
        id: 0,
        title: '',
        content: '',
        formatted_time: ''
    });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const auth = useAuth();

    // 获取文章数据
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/posttext?id=${post}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const result = await response.json();
                if (!result.data) throw new Error('Invalid data format');

                setPosts(result.data);
            } catch (error) {
                console.error('数据获取失败:', error);
                api.error({
                    message: '数据加载失败',
                    description: '无法获取文章内容，请稍后重试'
                });
            }
        };

        fetchPosts();
    }, [postid, api]);

    // 标签变更处理
    const onTagChange = useCallback((newTags: string[]) => {
        setTags(newTags);
    }, []);

    // 提交处理
    const handleClick = useCallback(async () => {
            if (!quillRef.current || !quilltitle.current) {
                throw new Error('编辑器未正确初始化');
            }

            const content = quillRef.current.root.innerHTML;
            const title = quilltitle.current.innerHTML;
            const timenow = new Date();

            const postData = {
                id: postid,
                title: title.trim(),
                tags,
                time: timenow.toISOString().split('T')[0],
                content
            };

            const response = await fetch(`/api/update?id=${post}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) throw new Error(`更新失败: ${response.status}`);

            const result = await response.json();
            if (result.success) {
                api.success({
                    message: '更新成功',
                    description: '文章已成功更新'
                });
                setTimeout(() => window.location.reload(), 1500);
            }
    }, [postid, tags, api]);



    return (
        <>
            <div>
                <Button onClick={() => auth ? setOpen(true) : api.warning({
                    message: '权限不足',
                    description: '请先以管理员身份登录'
                })}>
                    编辑文章
                </Button>
            </div>

            {contextHolder}

                <Modal

                    width={1200}
                    open={open}
                    title="提交文章"
                    onCancel={() => setOpen(false)}
                    footer={[
                        <Button key="back" onClick={() => setOpen(false)}>返回</Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={loading}
                            onClick={async () => {
                                setLoading(true);
                                try {
                                    await handleClick();
                                } finally {
                                    setLoading(false);
                                    setOpen(false);
                                }
                            }}
                        >
                            提交
                        </Button>
                    ]}
                >
                    <Posttag onTagChange={onTagChange} />

                    <div
                        ref={quilltitle}
                        contentEditable
                        className="titleput"
                        dangerouslySetInnerHTML={{ __html: posts.title }}
                    />

                    <Editor
                        ref={quillRef}
                        defaultValue={new Delta().insert(posts.content)}
                    />
                </Modal>

        </>
    );
};

export default Update;