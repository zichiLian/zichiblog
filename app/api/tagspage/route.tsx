
import pool from '@/app/db'
import {NextRequest} from "next/server";


export async function GET(
    req: NextRequest
) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const connection = await pool.getConnection();
    try {
        // 使用JSON_EXTRACT确保从MySQL获取有效的JSON
        const [rows] = await connection.query(`
                SELECT
                    p.id , p.title ,DATE_FORMAT(time, '%Y-%m-%d') as formatted_time
                FROM 
                    posts p
                JOIN 
                    tags t
                on
                    p.id = t.id
                where 
                    t.name = '${id}'
               
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


