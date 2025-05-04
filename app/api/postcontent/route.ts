import {NextRequest, NextResponse} from 'next/server'
import pool from '@/app/db'

async function postcontent(
    req: NextRequest)
{
    const params = req.method === 'POST' ?  await req.json() : Object.fromEntries(req.nextUrl.searchParams.entries())
//前端收到的请求，params打包

//定义str变量，把获取来的params转为jason格式



    let connection;

        // 创建连接池
        connection = await pool.getConnection();

        // const [postid] = await connection.query(`SELECT MAX(id) FROM posts`)
    let postid: any;
    [postid] = await connection.query(`SELECT id FROM posts`);

    let id: number;
         id = postid.length+1 ;
        const title = params.title;
        const content = params.content;
        const tag = params.tags;
        const tags = tag.join('｜');
        const time = params.time;
    //select 和 insert语句中， 这些数值可以帮助我使用where = xxx关键字语句

console.log('tags',tags);


    const [write] = await connection.query(`
         INSERT INTO posts(id, title, content, time)
         values
             (${id},
             '${title}','${content}','${time}')
        `);


    for(let i =0 ; i < tag.length; i++) {
        const [tagsInto] = await connection.query(`
            INSERT INTO tags(name)
            values ('
          ${tag[i]}
          ')
        `)
    }

    const [insert] = await connection.query(`
            INSERT INTO menu(title, tag)
            VALUES
                ('${title}','${tags}')
        `);





    //
    // const [insertTags] = await connection.query(`
    // UPDATE tie_up
    // SET type = CONCAT(COALESCE(type, ''), ?)
    // WHERE id = ?`
    //     , [tags, id]);
    //

    // fs.writeFileSync(`./storage/posts/text${postdata.postNum}.json`, JSON.stringify(str),{flag:'w+'})
//将获取来的文章内容，创建并写入{文章数量}.json文件。


    return Response.json({

    })
}


export {
    postcontent as POST
}