import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { posts, tags } from '@/src/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const year = searchParams.get('id');

        if (!year || !/^\d{4}$/.test(year)) {
            return NextResponse.json(
                {
                    success: false,
                    message: '请提供有效的4位数年份参数 (如: ?id=2025)',
                    error: 'INVALID_YEAR_FORMAT'
                },
                { status: 400 }
            );
        }


        const [postResults, tagResults] = await Promise.all([

            db
                .select({
                    id: posts.id,
                    title: posts.title,
                    time: sql<string>`DATE_FORMAT(${posts.time}, '%Y-%m-%d')`.as('time')
                })
                .from(posts)
                .where(sql`YEAR(${posts.time}) = ${year}`)
                .orderBy(posts.time),

            // 查询关联标签
            db
                .select({
                    number: tags.number,
                    id: tags.id,
                    name: tags.name
                })
                .from(tags)
                .innerJoin(posts, eq(posts.id, tags.id))
                .where(sql`YEAR(${posts.time}) = ${year}`)
        ]);


        return NextResponse.json({
            success: true,
            posts: postResults,
            tags: tagResults
        });

    } catch (error) {
        console.error('数据库查询错误:', error);
        return NextResponse.json(
            {
                success: false,
                message: '数据库操作失败',
                error: 'DATABASE_ERROR'
            },
            { status: 500 }
        );
    }
}
            // 使用JSON_EXTRACT确保从MySQL获取有效的JSON
           //  const [posts, tags] = await Promise.all([
           //      connection.query(
           //          `SELECT id, title, DATE_FORMAT(time, '%Y-%m-%d') as time
           // FROM posts
           // WHERE YEAR(time) = ${id}
           // ORDER BY time`,
           //      ),
           //
           //      connection.query(
           //          `SELECT t.number, t.id, t.name
           // FROM posts p
           // JOIN tags t ON p.id = t.id
           // WHERE YEAR(p.time) = ?`,
           //          [id]
           //      )
           //  ])
           //
           //
           //
           //  // 确保返回标准JSON格式
           //  return new Response(JSON.stringify({
           //      success: true,
           //      posts: posts[0],
           //      tags: tags[0]
           //  }), {
           //      status: 200,
           //      headers: {
           //          'Content-Type': 'application/json; charset=utf-8',
           //      }
           //  });
