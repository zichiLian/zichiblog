import pool from '@/app/db'
import { NextRequest } from "next/server";

async function handleRequest(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // 参数验证
    if (!id) {
        return new Response(JSON.stringify({
            success: false,
            message: 'Missing id parameter'
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    const connection = await pool.getConnection();
    try {
        // 使用参数化查询防止SQL注入
        const [posts] = await connection.query(`
            SELECT
                id,
                title,
                DATE_FORMAT(time, '%Y-%m-%d') as time
            FROM 
                blog.posts
            WHERE
                YEAR(time) = ?
            ORDER BY 
                time
        `, [id]);

        const [tags] = await connection.query(`
            SELECT
                t.number, t.id, t.name
            FROM 
                posts p
            JOIN 
                tags t
            ON
                p.id = t.id
            WHERE 
                YEAR(p.time) = ?
        `, [id]);

        return new Response(JSON.stringify({
            success: true,
            posts: posts,
            tags: tags
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Internal server error'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } finally {
        connection.release();
    }
}

export async function GET(req: NextRequest) {
    return handleRequest(req);
}

export async function POST(req: NextRequest) {
    return handleRequest(req);
}