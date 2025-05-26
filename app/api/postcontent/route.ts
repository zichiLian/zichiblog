// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { posts, tags, menu } from '@/src/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        // 1. 获取并验证参数
        const params = req.method === 'POST'
            ? await req.json()
            : Object.fromEntries(req.nextUrl.searchParams.entries());

        if (!params.title || !params.content || !params.tags) {
            return NextResponse.json(
                { success: false, message: '缺少必要参数' },
                { status: 400 }
            );
        }

        // 2. 获取最新ID（安全方式）
        const [latestPost] = await db
            .select({ id: posts.id })
            .from(posts)
            .orderBy(posts.id)
            .limit(1);

        const newId = latestPost ? latestPost.id + 1 : 1;
        const tagList = Array.isArray(params.tags) ? params.tags : [params.tags];
        const tagsString = tagList.join('｜');

        // 3. 使用事务确保数据一致性
        await db.transaction(async (tx) => {
            // 插入文章
            await tx.insert(posts).values({
                id: newId,
                title: params.title,
                content: params.content,
                time: params.time || new Date()
            });

            // 插入标签
            for (const tagName of tagList) {
                await tx.insert(tags).values({
                    id: newId,
                    name: tagName
                });
            }

            // 插入菜单
            await tx.insert(menu).values({
                id: newId,
                title: params.title,
                tag: tagsString
            });
        });

        // 4. 返回成功响应
        return NextResponse.json({
            success: true,
            data: { id: newId }
        });

    } catch (error) {
        console.error('创建文章失败:', error);
        return NextResponse.json(
            { success: false, message: '服务器内部错误' },
            { status: 500 }
        );
    }
}