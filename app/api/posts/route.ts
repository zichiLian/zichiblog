import {NextRequest, NextResponse} from 'next/server';
import pool from '@/app/db';

export async function GET(
    req: NextRequest) {

    try {
        const connection = await pool.getConnection();
        try {
            // 使用JSON_EXTRACT确保从MySQL获取有效的JSON
            let rows: any;
            [rows] = await connection.query(`
                SELECT 
                    id,
                    title,
                    content,
                    DATE_FORMAT(time, '%Y-%m-%d') as formatted_time
                FROM posts
                ORDER BY time DESC
                LIMIT 100
            `);

            let tag : any;
            [tag] = await connection.query(`
                SELECT
                       id,tag
                FROM 
                       menu
                LIMIT 100
            `);


            // 确保返回标准JSON格式
            return new Response(JSON.stringify({
                success: true,
                data: rows,
                tags:tag
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            });

        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: 'Internal Server Error',
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        });
    }
}