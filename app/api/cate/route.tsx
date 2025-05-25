import pool from "@/app/db";

//
// type ResponseData = {
//   message: string
// }
//
// let tagsdata: any;
// let cacheData:any;

async function Cate(){

//定义str变量，把获取来的params转为jason格式

    const connection = await pool.getConnection();

    try {
        // 使用JSON_EXTRACT确保从MySQL获取有效的JSON
        const [row] = await connection.query(`
            SELECT 
                  number,id,name 
            FROM 
                  cate
            ORDER BY 
                   id DESC    
                   LIMIT 100
            `);

        // 确保返回标准JSON格式
        return new Response(JSON.stringify({
            success: true,
            data: row
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
    Cate as GET,
    Cate as POST
}