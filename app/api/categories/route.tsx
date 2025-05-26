// app/api/posts/route.ts
import { NextRequest } from 'next/server';
import { db } from '@/src/db';
import { posts, cate } from '@/src/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryName = searchParams.get('id');

        // 1. 参数验证
        if (!categoryName) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: '请提供分类名称参数'
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                }
            );
        }

        // 2. 使用Drizzle执行安全查询
        const results = await db
            .select({
                id: posts.id,
                title: posts.title,
                formatted_time: sql<string>`DATE_FORMAT(${posts.time}, '%Y-%m-%d')`.as('formatted_time')
            })
            .from(posts)
            .innerJoin(cate, eq(posts.id, cate.id))
            .where(eq(cate.name, categoryName));

        // 3. 返回标准化响应
        return new Response(
            JSON.stringify({
                success: true,
                data: results
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
        // 使用JSON_EXTRACT确保从MySQL获取有效的JSON
        // const [rows] = await connection.query(`
        //         SELECT
        //             p.id , p.title ,DATE_FORMAT(time, '%Y-%m-%d') as formatted_time
        //         FROM
        //             posts p
        //         JOIN
        //             cate c
        //         on
        //             p.id = c.id
        //         where
        //             c.name = '${id}'
        //
        //     `);

