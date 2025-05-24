import pool from '@/app/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        const connection = await pool.getConnection()
        try {
            const [rows] = await connection.query(`
        SELECT DATE_FORMAT(time, '%Y-%m-%d') as time
        FROM posts
        ORDER BY time 
        LIMIT 100
      `)

            const [time] = await connection.query(`
        SELECT
          id,
          title,
          DATE_FORMAT(time, '%Y-%m-%d') as time
        FROM posts
        ORDER BY time
      `)

            const [posts] = id ? await connection.query(`
        SELECT
          id,
          title,
          DATE_FORMAT(time, '%Y-%m-%d') as time
        FROM posts
        WHERE YEAR(time) = ${id}
        ORDER BY time
      `) : [[]]


            return NextResponse.json({
                success: true,
                data: time,
                time: rows,
                // @ts-ignore
                posts: posts?.[0] || []
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


export async function POST(request: NextRequest) {
    return NextResponse.json(
        { success: false, message: 'Method not allowed' },
        { status: 405 }
    )
}