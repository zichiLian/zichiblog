import React, {useEffect, useRef, useState, forwardRef} from "react";
import Quill from "quill";
import 'quill/dist/quill.snow.css';
import {notification, Button, Modal, FloatButton} from 'antd';
import Posttag from "@/app/components/tags";
import {useAuth} from "@/app/hooks/useAuth";
import {useRouter} from "next/navigation";

// 类型声明扩展
declare module 'quill' {
    interface Quill {
        root: HTMLElement;
    }
}

interface EditorProps {
    defaultValue?: any;
}

const Editor = forwardRef<Quill, EditorProps>(({defaultValue}, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && !(ref as React.MutableRefObject<Quill | null>).current) {
            const quill = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{header: [1, 2, 3, false]}],
                        ['bold', 'italic', 'underline'],
                        ['code-block', 'blockquote'],
                        [{list: 'ordered'}, {list: 'bullet'}],
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

    return <div ref={editorRef}/>;
});

Editor.displayName = 'Editor';

const Delta = Quill.import('delta');

interface DrawsProps {
    savetag?: any[]
}

export default function Draws(_savetag: DrawsProps) {
    const quillRef = useRef<Quill | null>(null);
    const quilltitle = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const auth = useAuth();
    const router = useRouter();

    const showModal = () => {
        auth ? setOpen(true) : api.warning({
            message: '权限提示',
            description: '只有管理员才可以上传/编辑文章，请先登录'
        });
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 1900);
    };

    const handleCancel = () => setOpen(false);

    const handleSubmit = async () => {
        try {
            if (!quillRef.current || !quilltitle.current) {
                throw new Error('编辑器未正确初始化');
            }

            const content = quillRef.current.root.innerText;
            const title = quilltitle.current.innerHTML;
            const timenow = new Date();
            console.log(quillRef);

            const postData = {
                id: 0,
                title: title.trim(),
                tags,
                time: `${timenow.getFullYear()}-${timenow.getMonth() + 1}-${timenow.getDate()}`,
                content
            };

            const response = await fetch('/api/postcontent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) throw new Error(`提交失败: ${response.status}`);

            api.success({
                message: '提交成功',
                description: '文章已进入审核队列'
            });

            router.refresh();
        } catch (error) {
            console.error('提交错误:', error);
            api.error({
                message: '提交失败',
                description: error instanceof Error ? error.message : '未知错误'
            });
        }
    };

    return (
        <div className="quill">
            <FloatButton.Group shape="circle" style={{insetInlineEnd: 24}}>
                {auth.isAdmin && !auth.isLoading && (
                    <FloatButton onClick={showModal} />
                )}
                <FloatButton.BackTop visibilityHeight={0}/>
            </FloatButton.Group>

            {contextHolder}

            <Modal
                width={1200}
                open={open}
                title="提交文章"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>返回</Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={async () => {
                            await handleSubmit();
                            handleOk();
                        }}
                    >
                        提交
                    </Button>
                ]}
            >
                <Posttag onTagChange={setTags}/>

                <div
                    ref={quilltitle}
                    contentEditable
                    className="titleput"
                    dangerouslySetInnerHTML={{__html: '标题'}}
                />

                <Editor
                    ref={quillRef}
                    defaultValue={new Delta().insert('')}
                />
            </Modal>
        </div>
    );
}