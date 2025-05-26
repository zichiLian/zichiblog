import { NextRequest } from 'next/server';
import { db } from '@/src/db';
import { posts, tags } from '@/src/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        // 验证ID参数
        if (!id || isNaN(Number(id))) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: '请提供有效的文章ID'
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                }
            );
        }

        // 并行查询文章和标签
        const [postResults, tagResults] = await Promise.all([
            // 查询文章
            db
                .select({
                    id: posts.id,
                    title: posts.title,
                    content: posts.content,
                    formatted_time: sql<string>`DATE_FORMAT(${posts.time}, '%Y-%m-%d')`.as('formatted_time')
                })
                .from(posts)
                .where(eq(posts.id, Number(id)))
                .orderBy(posts.time)
                .limit(100),

            // 查询关联标签
            db
                .select({
                    number: tags.number,
                    id: tags.id,
                    name: tags.name
                })
                .from(tags)
                .where(eq(tags.id, Number(id)))
        ]);

        // 检查文章是否存在
        if (postResults.length === 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: '文章不存在'
                }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                data: postResults[0], // 返回单篇文章
                tags: tagResults
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            }
        );

    } catch (error) {
        console.error('数据库查询错误:', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: '数据库操作失败'
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            }
        );
    }
}
            // const [rows] = await connection.query(`
            //     SELECT
            //         id,
            //         title,
            //         content,
            //         DATE_FORMAT(time, '%Y-%m-%d') as formatted_time
            //     FROM posts
            //     where id = ${id}
            //     ORDER BY time DESC
            //         LIMIT 100
            // `);
            //
            // const [tags] = await connection.query(`
            // SELECT
            //      number,
            //      id,
            //      name
            // from
            //     tags
            // where
            //      id = ${id}
            // `)
