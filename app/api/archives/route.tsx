import {NextRequest, NextResponse} from 'next/server';
import pool from '@/app/db';

export async function GET(
    req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        const connection = await pool.getConnection();
        try {
            // 使用JSON_EXTRACT确保从MySQL获取有效的JSON
            const [posts, tags] = await Promise.all([
                connection.query(
                    `SELECT id, title, DATE_FORMAT(time, '%Y-%m-%d') as time
           FROM posts
           WHERE YEAR(time) = ${id}
           ORDER BY time`,
                ),

                connection.query(
                    `SELECT t.number, t.id, t.name
           FROM posts p
           JOIN tags t ON p.id = t.id
           WHERE YEAR(p.time) = ?`,
                    [id]
                )
            ])



            // 确保返回标准JSON格式
            return new Response(JSON.stringify({
                success: true,
                posts: posts[0],
                tags: tags[0]
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

//
// const connection = await pool.getConnection();
//
// try {
//     // 使用JSON_EXTRACT确保从MySQL获取有效的JSON
//     const [row] = await connection.query(
//         `SELECT p.id,p.title,DATE_FORMAT(p.time,'%Y-%m-%d'),t.number, t.id, t.name
//            FROM posts p
//            JOIN tags t ON p.id = t.id
//            WHERE YEAR(p.time) = ${id}`);
//
//     // 确保返回标准JSON格式
//     return new Response(JSON.stringify({
//         success: true,
//         data: row
//     }), {
//         status: 200,
//         headers: {
//             'Content-Type': 'application/json; charset=utf-8',
//         }
//     });
//
// } finally {
//     connection.release();
// }
// }
