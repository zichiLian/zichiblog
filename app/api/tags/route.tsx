import pool from "@/app/db";

//
// type ResponseData = {
//   message: string
// }
//
// let tagsdata: any;
// let cacheData:any;

async function TAGS(){
    //
    // const params = req.method === 'GET' ? Object.fromEntries(req.nextUrl.searchParams.entries()) : await req.json()
    //
    // const items = [];
    //
    // const file = fs.readdirSync('./storage/posts');
    // for (let i =0; i<file.length; i++) {
    //     const files = file[i];
    //     // console.log(files);
    //     cacheData = JSON.parse(fs.readFileSync(`./storage/posts/${files}`).toString());
    //     items.push(cacheData);
    //
    // }
    //
    //
    //
    // return Response.json({
    //     data: items
    //
    //  })}
    //
    // export {
    //     tags as GET,
    //     tags as POST
    // }
//前端收到的请求，params打包

//定义str变量，把获取来的params转为jason格式

        const connection = await pool.getConnection();

        try {
            // 使用JSON_EXTRACT确保从MySQL获取有效的JSON
            const [row] = await connection.query(`
            SELECT 
             number,id,name 
            FROM tags
            ORDER BY id DESC    
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
    TAGS as GET,
    TAGS as POST
}