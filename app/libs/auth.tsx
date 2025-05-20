// lib/auth.ts
import { jwtVerify, SignJWT } from 'jose';

// 安全获取密钥（服务端专用）
export function getJwtSecretKey(): Uint8Array {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
        throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }
    return new TextEncoder().encode(secret);
}

// 生成JWT令牌（仅限服务端使用）
export async function generateToken(payload: { username: string }): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(getJwtSecretKey());
}

// 验证JWT令牌（服务端API路由使用）
export async function verifyJwtToken(token: string): Promise<{ username: string } | null> {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());
        return payload as { username: string };
    } catch {
        return null;
    }
}