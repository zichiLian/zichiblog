import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verifyJwtToken } from '@/app/libs/auth';

export async function GET(request: NextRequest) {  // 使用NextRequest代替Request
    try {
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({
                isAdmin: false,
                message: 'No token found in cookies'
            });
        }

        const verified = await verifyJwtToken(token);
        return NextResponse.json({
            isAdmin: !!verified,
            username: verified?.username
        });
    } catch (error) {
        console.error('[Auth Check] Error:', error);
        return NextResponse.json({
            isAdmin: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}