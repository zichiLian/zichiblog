// app/api/bilibili/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const vmid = searchParams.get('vmid');

    if (!vmid) {
        return NextResponse.json(
            { error: 'Missing vmid parameter' },
            { status: 400 }
        );
    }

    try {
        const response = await axios.get('https://api.bilibili.com/x/relation/stat', {
            params: { vmid },
            headers: {
                'Referer': 'https://www.bilibili.com',
                'User-Agent': 'Mozilla/5.0'
            }
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('B站API请求失败:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Bilibili data'},
            { status: 500 }
        );
    }
}

// 处理OPTIONS预检请求
export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}