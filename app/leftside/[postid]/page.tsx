'use client';
import '../../index.css'
import {useParams} from "next/navigation";
import React from "react";
import Links from "@/app/leftside/links";
import About from "@/app/leftside/about";
import Archives from "@/app/archives/[postid]/post";
import Post from "@/app/leftside/categories";
import Rss from "@/app/leftside/rss";



export default function TextPage() {
    const {postid} = useParams();



        return (
            <div className="box">
                <div id="fullwindow">
                    <div className="container">
                            {postid === "Links" && <Links/>}
                            {postid === "About" && <About/>}
                            {postid === "Archives" && <Archives/>}
                            {postid === "Categories" && <Post/>}
                            {postid === "RSS" && <Rss/>}
                    </div>
                </div>
            </div>
        )

}