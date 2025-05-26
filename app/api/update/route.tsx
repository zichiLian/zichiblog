import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { posts } from '@/src/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        // 1. 安全获取参数
        const params = req.method === 'POST'
            ? await req.json()
            : Object.fromEntries(req.nextUrl.searchParams.entries());

        // 2. 参数验证
        if (!params.id?.id || !params.title || !params.content) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const postId = params.id.id;

        // 3. 使用Drizzle执行更新
        const result = await db
            .update(posts)
            .set({
                title: params.title,
                content: params.content,
                lasttime: params.time ? new Date(params.time) : new Date()
            })
            .where(eq(posts.id, postId));

        // 4. 正确获取影响行数
        const affectedRows = result[0].affectedRows;

        // 5. 返回标准化响应
        return NextResponse.json({
            success: true,
            data: {
                affectedRows: affectedRows
            }
        });

    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json(
            { success: false, message: 'Database operation failed' },
            { status: 500 }
        );
    }
}