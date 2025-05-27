'use client'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useState, FormEvent } from "react";
import { Button, Modal, message } from 'antd';

export default function Login() {
    const [open, setOpen] = useState(false);
    const [_loading, setLoading] = useState(false);
    const router = useRouter();
    const { isAdmin, isLoading } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch('/api/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.get('username'),
                    password: formData.get('password')
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert('欢迎回来，管理员')
                setOpen(false);
                router.refresh();
            } else {
                message.error(result.error || '登录失败');
            }
        } catch (error) {
            message.error('请求失败');
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) return <div>加载中...</div>;

    return (
        <div className='Logining'>
            {isAdmin ? (
                <p>以管理员身份浏览中</p>
            ) : (
                <Button onClick={() => setOpen(true)} className='login'>
                    管理员验证
                </Button>
            )}

            <Modal
                title='验证管理员权限'
                width={500}
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <div className='logincard'>
                    <form onSubmit={handleSubmit} className='loginform'>
                        <label>
                            用户名:
                            <input
                                type='text'
                                required
                                placeholder='username...'
                                name='username'
                                className='username'
                            />
                        </label>
                        <label>
                            密 码 :
                            <input
                                type='password'
                                required
                                placeholder='password...'
                                name='password'
                                className='password'
                            />
                        </label>
                        <Button
                            htmlType="submit"
                            type="primary"
                            className='loginBtn'

                        >
                            登录
                        </Button>
                    </form>
                </div>

            </Modal>
        </div>
    )
}
