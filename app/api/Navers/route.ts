import type { NextRequest } from 'next/server'
import fs from "node:fs";

type ResponseData = {
    message: string
}

let cacheData: any;

async function Navers(
    req: NextRequest)
{

    const params = req.method === 'GET' ? Object.fromEntries(req.nextUrl.searchParams.entries()) : await req.json()
    // if (!cacheData) {
        cacheData = JSON.parse(fs.readFileSync('./storage/Navers.json').toString())
    // }
    return Response.json({
        data: cacheData
    })

}
export {
    Navers as GET,
    Navers as POST
}