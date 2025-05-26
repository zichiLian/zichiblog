import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/src/db'
import { posts } from '@/src/schema'
import { eq, sql } from 'drizzle-orm'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const year = searchParams.get('id')

        // 1. 获取时间列表（格式化日期）
        const timeRows = await db
            .select({
                time: sql<string>`DATE_FORMAT(${posts.time}, '%Y-%m-%d')`.as('time')
            })
            .from(posts)
            .orderBy(posts.time)
            .limit(100)

        // 2. 获取完整文章列表
        const fullPosts = await db
            .select({
                id: posts.id,
                title: posts.title,
                time: sql<string>`DATE_FORMAT(${posts.time}, '%Y-%m-%d')`.as('time')
            })
            .from(posts)
            .orderBy(posts.time)

        const result = await db
            .select({
                year: sql<number>`YEAR(${posts.time})`.as('year')  // 使用SQL片段
            })
            .from(posts)
            .where(
                sql`YEAR(${posts.time}) IN (2024, 2025)`
            )
            .groupBy(sql`YEAR(${posts.time})`);

        const filteredPosts = year
            ? await db
                .select({
                    id: posts.id,
                    title: posts.title,
                    time: sql<string>`DATE_FORMAT(${posts.time}, '%Y-%m-%d')`.as('time')
                })
                .from(posts)
                .where(sql`YEAR(${posts.time}) = ${year}`)
                .orderBy(posts.time)
            : []

        return NextResponse.json({
            success: true,
            data: fullPosts,
            time: timeRows,
            posts: filteredPosts,
            years:result
        })

    } catch (error) {
        console.error('Error in /api/posts:', error)
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    return NextResponse.json(
        { success: false, message: 'Method not allowed' },
        { status: 405 }
    )
}
      //
      //   const connection = await pool.getConnection()
      //   try {
      //       const [rows] = await connection.query(`
      //   SELECT DATE_FORMAT(time, '%Y-%m-%d') as time
      //   FROM posts
      //   ORDER BY time
      //   LIMIT 100
      // `)
      //
      //       const [time] = await connection.query(`
      //   SELECT
      //     id,
      //     title,
      //     DATE_FORMAT(time, '%Y-%m-%d') as time
      //   FROM posts
      //   ORDER BY time
      // `)
      //
      //       const [posts] = id ? await connection.query(`
      //   SELECT
      //     id,
      //     title,
      //     DATE_FORMAT(time, '%Y-%m-%d') as time
      //   FROM posts
      //   WHERE YEAR(time) = ${id}
      //   ORDER BY time
      // `) : [[]]
      //
      //
      //       return NextResponse.json({
      //           success: true,
      //           data: time,
      //           time: rows,
      //           // @ts-ignore
      //           posts: posts?.[0] || []
      //       })
