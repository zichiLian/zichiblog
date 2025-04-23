
import {NextRequest, NextResponse} from 'next/server'
import pool from '@/app/db'

async function Delete(
    req: NextRequest)
{
    const params = req.method === 'POST' ?  await req.json() : Object.fromEntries(req.nextUrl.searchParams.entries())
//前端收到的请求，params打包

//定义str变量，把获取来的params转为jason格式

    const id =params.id.id;

    let connection;

    // 创建连接池
    connection = await pool.getConnection();

    // const [postid] = await connection.query(`SELECT MAX(id) FROM posts`)



    const [update] = await connection.query(
        `UPDATE posts
         SET title = ?, content = ? ,lasttime = ?
         WHERE id = ?`,
        [params.title, params.content,params.time,id] // 参数按顺序对应问号
    );


    // fs.writeFileSync(`./storage/posts/text${postdata.postNum}.json`, JSON.stringify(str),{flag:'w+'})
//将获取来的文章内容，创建并写入{文章数量}.json文件。


    return Response.json({

    })
}


export {
    Delete as POST
}