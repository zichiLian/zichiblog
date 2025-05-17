'use client';
import '../../index.css'
import {Post} from "@/app/leftside/[postid]/post";
import {useParams} from "next/navigation";
import HomePage from "@/app/homepage";
import React from "react";
import Links from "@/app/leftside/links";
import About from "@/app/leftside/about";
import Archives from "@/app/archives/[postid]/post";
import Categories from "@/app/leftside/categories";
import Rss from "@/app/leftside/rss";
import Leftnavbar from "@/app/main/leftnavbar"
import Rightnavbar from "@/app/main/rightnavbar";;
import Draws from "@/app/components/quills";;



export default function TextPage() {
    const {postid} = useParams();
    const defaultYear = new Date().getFullYear();

    if (postid === "Home") {
        return <HomePage/>;//如果postid是home，直接返回主页
            } else {
        return (
            <div className="box">
                <Leftnavbar/>
                <div id="fullwindow">
                    <div className="container">
                            {postid === "Links" && <Links/>}
                            {postid === "About" && <About/>}
                            {postid === "Archives" && <Archives id={defaultYear}/>}
                            {postid === "Categories" && <Categories/>}
                            {postid === "RSS" && <Rss/>}
                    </div>
                </div>
                 <Rightnavbar/>
                <Draws/>
            </div>
        )
    }
}