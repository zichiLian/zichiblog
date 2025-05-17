import pool from '@/app/db'
import { NextResponse } from 'next/server'

export async function Time(
    request: Request,
    context: { params?: Record<string, string> }
) {

    const rawId = context.params?.id ||
        new URL(request.url).searchParams.get('id') ||
        ''
    const id = String(rawId).trim()


    if (!id || !/^\d{4}$/.test(id)) {
        return NextResponse.json(
            { success: false, message: '请提供有效的年份参数（YYYY格式）' },
            { status: 400 }
        )
    }

    const connection = await pool.getConnection()
    try {

        const [posts, tags] = await Promise.all([
            connection.query(`
        SELECT 
          id, 
          title, 
          DATE_FORMAT(time, '%Y-%m-%d') as time
        FROM 
          blog.posts
        WHERE
          YEAR(time) = ${id}
        ORDER BY 
          time
      `),
            connection.query(`
        SELECT
          t.number, t.id, t.name
        FROM 
          posts p
        JOIN 
          tags t ON p.id = t.id
        WHERE 
          YEAR(p.time) = '${id}'
      `)
        ])

        return NextResponse.json({
            success: true,
            posts: posts[0],
            tags: tags[0]
        })

    } catch (error) {
        console.error('[API Error]', error)
        return NextResponse.json(
            { success: false, message: '服务器内部错误' },
            { status: 500 }
        )
    } finally {
        connection.release()
    }
}


export { Time as GET, Time as POST }