import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { generateToken } from '@/app/libs/auth';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        // 验证环境变量
        if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
            throw new Error('Admin credentials not configured');
        }

        // 验证凭证
        if (username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD) {

            const token = await generateToken({ username });
            const response = NextResponse.json({ success: true });

            response.cookies.set({
                name: 'token',
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 2, // 2小时
                path: '/',
                sameSite: 'strict'
            });

            return response;
        }

        return NextResponse.json(
            { success: false, error: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}