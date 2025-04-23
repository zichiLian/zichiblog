import { NextResponse } from 'next/server';
import pool from '@/app/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 测试查询
        const [posts] = await pool.query(`
      SELECT * FROM user 
      ORDER BY name DESC 
    `);

        return NextResponse.json({
            status: 'success',
            posts: posts || []
        });

    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            error: error.message
        }, { status: 500 });
    }
}