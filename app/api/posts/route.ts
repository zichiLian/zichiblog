import { NextRequest } from 'next/server';
import { db } from '@/src/db';
import { posts, menu } from '@/src/schema';
import { sql } from 'drizzle-orm';

export async function GET(_req: NextRequest) {
    try {
        // 并行查询所有数据
        const [postsData, menuTags, allPosts] = await Promise.all([
            // 查询格式化时间的文章
            db
                .select({
                    id: posts.id,
                    title: posts.title,
                    content: posts.content,
                    formatted_time: sql<string>`DATE_FORMAT(${posts.time}, '%Y-%m-%d')`.as('formatted_time')
                })
                .from(posts)
                .orderBy(posts.time)
                .limit(100),

            // 查询菜单标签
            db
                .select({
                    id: menu.id,
                    tag: menu.tag
                })
                .from(menu)
                .limit(100),

            // 查询所有文章
            db
                .select()
                .from(posts)
                .limit(100)
        ]);

        return new Response(
            JSON.stringify({
                success: true,
                data: postsData,
                tags: menuTags,
                posts: allPosts
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            }
        );

    } catch (error) {
        console.error('Database error:', error);
        return new Response(
            JSON.stringify({
                success: false,
                error: 'Internal Server Error',
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
            // let rows: any;
            // [rows] = await connection.query(`
            //     SELECT
            //         id,
            //         title,
            //         content,
            //         DATE_FORMAT(time, '%Y-%m-%d') as formatted_time
            //     FROM posts
            //     ORDER BY time DESC
            //     LIMIT 100
            // `);
            //
            // let tag : any;
            // [tag] = await connection.query(`
            //     SELECT
            //            id,tag
            //     FROM
            //            menu
            //     LIMIT 100
            // `);
            // let posts : any;
            // [posts] = await connection.query(`
            //     SELECT
            //            *
            //     FROM
            //            posts
            //     LIMIT 100
            // `);
