import {jwtVerify} from "jose";

export function getJwtSecretKey() {
    //验证令牌逻辑；
    const secret = process.env.JWT_SECRET_KEY;
    //.env文件夹里的属性
    if(!secret) {
        throw new Error('Missing JWT secret key');
    }
    return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string | Uint8Array<ArrayBufferLike>){
    try {
        const {payload} = await jwtVerify(token,getJwtSecretKey());
        return payload;
    }
    catch(err){
        return null;
    }
}