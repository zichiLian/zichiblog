'use client'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import React, { useEffect, useState, FormEvent } from "react";
import { Button, Modal, message } from 'antd';

interface User {
    id: number;
    name: string;
}

export default function Login() {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();
    const auth = useAuth();

    // 获取用户列表

    // 表单提交处理
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const form = e.currentTarget;
            const formData = new FormData(form);

            const res = await fetch('/api/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.get('username'),
                    password: formData.get('password')
                })
            });

            if (!res.ok) throw new Error(`登录失败，状态码: ${res.status}`);

            const { success } = await res.json();

            if (success) {
                message.success('欢迎回来');
                setOpen(false);
                router.push('/');
            } else {
                message.error('登录失败，请检查账号和密码');
            }
        } catch (error) {
            console.error('登录请求失败:', error);
            message.error('网络错误，请稍后重试');
        }
    };

    return (
        <div className='Logining'>
            {auth ? (
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