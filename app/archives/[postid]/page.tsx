'use client';
import '@/app/index.css'
import Post from "@/app/archives/[postid]/post";
import {useParams} from "next/navigation";
import Rightnavbar from "@/app/main/rightnavbar";
import Leftnavbar from "@/app/main/leftnavbar";
import Draws from "@/app/components/quills";



export default function TextPage() {
    const {postid} = useParams();//postid连接useparams用法

    return (
        <>
            <Leftnavbar/>
            <Post id={postid as string} />
            <Rightnavbar/>
            <Draws/>
        </>
    )
}
