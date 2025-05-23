import pool from '@/app/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    try {
        const connection = await pool.getConnection()
        try {
            // 使用反引号包裹保留关键字，或使用别名
            const [posts] = await connection.query(`
             SELECT YEAR(time) AS year
             FROM posts
             WHERE YEAR(time) IN (2024, 2025)
             GROUP BY YEAR(time);             
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