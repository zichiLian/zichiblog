'use client'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import React, { useEffect, useState, FormEvent } from "react";
import { Button, Modal, message } from 'antd';
import {refreshReducer} from "next/dist/client/components/router-reducer/reducers/refresh-reducer";

interface User {
    id: number;
    name: string;
}

export default function Login() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const auth = useAuth();

    // 获取用户列表


    // 表单提交处理
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
             if (res.status != 200) {
                 alert('账号密码错误，请检查！')
             } else{
                 alert('欢迎回来，管理员');
                 setOpen(false);
                 window.location.reload()

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