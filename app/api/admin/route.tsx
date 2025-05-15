import {SignJWT} from 'jose'
import {NextResponse, NextRequest} from 'next/server'
import {getJwtSecretKey} from '@/app/libs/auth'




//定义登陆端口；
export async function POST (request:NextRequest){
    const body = await request.json();
    if (body.username === '*****'  &&  body.password==='****'){//如果username等于管理员‘******’ ，密码也等于，运行以下代码
        const token = await new SignJWT({
            username: body.username,
        })
            .setProtectedHeader({alg: 'HS256'})
            .setIssuedAt()
            .setExpirationTime('10000s')
            .sign(getJwtSecretKey());
        //以上为加密方式设置为HS256，持续时间为30s
        const response = NextResponse.json(
            {success: true,},
            {status:200, headers:{'content-type':'application/json'}}
        ); //如果请求成功，则返回这些数据，且在cookies里给予token钥匙
        response.cookies.set({
            name:'token',
            value:token,
            path:'/'

        });
        return response;
    }
    return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 });
}
