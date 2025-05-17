import pool from '@/app/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {

        const id = request.nextUrl.searchParams.get('id') || ''
        const year = id.trim()


        if (!year || !/^\d{4}$/.test(year)) {
            return NextResponse.json(
                {
                    success: false,
                    message: '请提供有效的4位数年份参数 (如: ?id=2025)',
                    error: 'INVALID_YEAR_FORMAT'
                },
                { status: 400 }
            )
        }

        const connection = await pool.getConnection()
        try {
            // 使用参数化查询
            const [posts, tags] = await Promise.all([
                connection.query(
                    `SELECT id, title, DATE_FORMAT(time, '%Y-%m-%d') as time
           FROM blog.posts
           WHERE YEAR(time) = ?
           ORDER BY time`,
                    [year]
                ),
                connection.query(
                    `SELECT t.number, t.id, t.name
           FROM posts p
           JOIN tags t ON p.id = t.id
           WHERE YEAR(p.time) = ?`,
                    [year]
                )
            ])

            return NextResponse.json({
                success: true,
                posts: posts[0],
                tags: tags[0]
            })

        } catch (error) {
            console.error('数据库查询错误:', error)
            return NextResponse.json(
                {
                    success: false,
                    message: '数据库操作失败',
                    error: 'DATABASE_ERROR'
                },
                { status: 500 }
            )
        } finally {
            if (connection) connection.release()
        }

    } catch (error) {
        console.error('服务器内部错误:', error)
        return NextResponse.json(
            {
                success: false,
                message: '服务器内部错误',
                error: 'INTERNAL_SERVER_ERROR'
            },
            { status: 500 }
        )
    }
}


export async function POST(request: NextRequest) {
    return NextResponse.json(
        { success: false, message: '本接口仅支持GET请求' },
        { status: 405 }
    )
}
