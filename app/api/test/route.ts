
import pool from '@/app/db'
import {NextRequest} from "next/server";


export async function Time(
    req: NextRequest
) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');



    const connection = await pool.getConnection();
    try {
        // 使用JSON_EXTRACT确保从MySQL获取有效的JSON


        const [posts] = await connection.query(`
              SELECT
                   id,
                   title,
                   DATE_FORMAT(time, '%Y-%m-%d') as time
              FROM 
                   blog.posts
              where
                   YEAR(time) = ${id}
              ORDER BY 
                   time
        `)

        const [tags] = await connection.query(`
                SELECT
                   t.number , t.id , t.name
                FROM 
                    posts p
                JOIN 
                    tags t
                on
                    p.id = t.id
                where 
                    YEAR(p.time) = '${id}'
                    `);


        // 确保返回标准JSON格式
        return new Response(JSON.stringify({
            success: true,
            posts:posts,
            tags:tags
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

export {
    Time as POST,
    Time as GET
}
