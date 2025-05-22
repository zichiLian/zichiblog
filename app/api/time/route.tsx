import pool from '@/app/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    try {
        const connection = await pool.getConnection()
        try {
            // 使用反引号包裹保留关键字，或使用别名
            const [posts] = await connection.query(`
                SELECT 
                    id,
                    title,
                    content,
                    DATE_FORMAT(time, '%Y-%m-%d') as formatted_time,
                    YEAR(time) as year,
                    MONTH(time) as month,
                    DATE_FORMAT(time, '%Y-%m') as formatted_year_month  -- 修改这里
                FROM posts
                ORDER BY time DESC
            `)

            return NextResponse.json({
                success: true,
                data: posts
            })

        } finally {
            connection.release()
        }
    } catch (error) {
        console.error('Error in /api/time:', error)
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}