import { db } from '@/src/db';
import {cate, tags} from '@/src/schema';
import { NextResponse } from 'next/server';

export async function GET() {
    try {

        const results = await db
            .select({
                number: cate.number,
                id: cate.id,
                name: cate.name
            })
            .from(cate)
            .orderBy(cate.id)
            .limit(100);

        const tag = await db
            .select({
                number: tags.number,
                id: tags.id,
                name: tags.name
            })
            .from(tags)
            .orderBy(tags.id)
            .limit(100);


        return NextResponse.json({
            success: true,
            data: results,
            tags: tag
        });

    } catch (error) {
        console.error('获取分类列表失败:', error);
        return NextResponse.json(
            {
                success: false,
                message: '获取分类列表失败'
            },
            { status: 500 }
        );
    }
}

export async function POST() {
    return NextResponse.json(
        {
            success: false,
            message: '本接口仅支持GET请求'
        },
        { status: 405 }
    );
}
        // const [row] = await connection.query(`
        //     SELECT
        //           number,id,name
        //     FROM
        //           cate
        //     ORDER BY
        //            id DESC
        //            LIMIT 100
        //     `);
