
import pool from '@/app/db'


export async function Time(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');



    const connection = await pool.getConnection();
    try {
        // 使用JSON_EXTRACT确保从MySQL获取有效的JSON
        const [rows] = await connection.query(`
                SELECT
                    DATE_FORMAT(time, '%Y') as time
                FROM 
                     blog.posts
                ORDER BY 
                     time 
                    LIMIT 100
            `);

        const [time] = await connection.query(`
              SELECT
                   id,
                   title,
                   DATE_FORMAT(time, '%Y-%m-%d') as time
              FROM 
                   blog.posts
              ORDER BY 
                   time
        `)

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


        // 确保返回标准JSON格式
        return new Response(JSON.stringify({
            success: true,
            data: rows,
            time: time,
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
