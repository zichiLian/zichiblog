import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { posts, tags,  menu } from '@/src/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        // 1. 获取并验证参数
        const params = req.method === 'POST'
            ? await req.json()
            : Object.fromEntries(req.nextUrl.searchParams.entries());

        if (!params.id) {
            return NextResponse.json(
                { success: false, message: '缺少必要参数: id' },
                { status: 400 }
            );
        }

        const postId = Number(params.id);
        if (isNaN(postId)) {
            return NextResponse.json(
                { success: false, message: 'ID必须是数字' },
                { status: 400 }
            );
        }

        // 2. 使用Drizzle执行删除
        const result = await
            db
            .delete(posts)
            .where(eq(posts.id, postId));
        await
            db
                .delete(tags)
                .where(eq(tags.id, postId));
          await
            db
                .delete(menu)
                .where(eq(menu.id, postId));

        // 3. 检查是否成功删除
        if (result[0].affectedRows === 0) {
            return NextResponse.json(
                { success: false, message: '未找到对应文章' },
                { status: 404 }
            );
        }

        // 4. 返回成功响应
        return NextResponse.json({
            success: true,
            message: '文章删除成功',
            affectedRows: result[0].affectedRows
        });

    } catch (error) {
        console.error('删除文章失败:', error);
        return NextResponse.json(
            {
                success: false,
                message: '服务器内部错误',
            },
            { status: 500 }
        );
    }


    // const [postid] = await connection.query(`SELECT MAX(id) FROM posts`)


    //
    // const [del] = await connection.query(`
    //      DELETE FROM
    //         posts
    //      where id =
    //          ${id}
    //     `);


    // fs.writeFileSync(`./storage/posts/text${postdata.postNum}.json`, JSON.stringify(str),{flag:'w+'})
//将获取来的文章内容，创建并写入{文章数量}.json文件。

}