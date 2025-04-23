
import pool from '@/app/db'


export async function GET(
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
                    id,
                    title,
                    content,
                    DATE_FORMAT(time, '%Y-%m-%d') as formatted_time
                FROM blog.posts
                where id = ${id}
                ORDER BY time DESC
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


