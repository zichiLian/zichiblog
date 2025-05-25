'use client';
import '@/app/index.css'
import {Post} from "@/app/categories/[postid]/post";
import {useParams} from "next/navigation";


export default function TextPage() {
    const {postid} = useParams();//postid连接useparams用法

    return (
        <>
            <Post id = {postid} />
        </>
    )
}
