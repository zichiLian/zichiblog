import { NextRequest } from 'next/server';
import { db } from '@/src/db';
import { posts, tags } from '@/src/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const tagName = searchParams.get('id');

        if (!tagName) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: '请提供有效的标签名称参数'
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                }
            );
        }

        // 使用Drizzle ORM进行类型安全的查询
        const results = await db
            .select({
                id: posts.id,
                title: posts.title,
                formatted_time: sql<string>`DATE_FORMAT(${posts.time}, '%Y-%m-%d')`.as('formatted_time')
            })
            .from(posts)
            .innerJoin(tags, eq(posts.id, tags.id))
            .where(eq(tags.name, tagName));

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
        // const [rows] = await connection.query(`
        //         SELECT
        //             p.id , p.title ,DATE_FORMAT(time, '%Y-%m-%d') as formatted_time
        //         FROM
        //             posts p
        //         JOIN
        //             tags t
        //         on
        //             p.id = t.id
        //         where
        //             t.name = '${id}'
        //
        //     `);



