import pool from '@/app/db'
import {NextResponse, NextRequest} from 'next/server'

export async function GET(
    request:NextRequest
) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const connection = await pool.getConnection();
    try {
        // 使用JSON_EXTRACT确保从MySQL获取有效的JSON
        const [rows] = await connection.query(`
                SELECT
                    id,
                    name,
                    svg
                FROM navbar
                    LIMIT 100
            `);


        // 确保返回标准JSON格式
        return new Response(JSON.stringify({
            success: true,
            data: rows
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        });

    } finally {
        connection.release();
    }
}


