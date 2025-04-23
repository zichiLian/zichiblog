'use client'
import React from "react";
import Cookies from 'universal-cookie'
import {verifyJwtToken} from "@/app/libs/auth";


export function useAuth(){
    //创建一个useState来验证令牌登陆状态
    const [auth, setAuth] = React.useState(null);
    const getVerifiedToken = async () => {
        const cookies = new Cookies();
        const token = cookies.get('token')?? null;
        const verifiedToken = await verifyJwtToken(token);
        // @ts-ignore
        setAuth(verifiedToken);
    };
    React.useEffect(() => {
        getVerifiedToken();
    },[]);
    return auth;
}
