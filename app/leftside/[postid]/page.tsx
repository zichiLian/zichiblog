'use client';
import '../../index.css'
import {Post} from "@/app/leftside/[postid]/post";
import {useParams} from "next/navigation";
import HomePage from "@/app/homepage";
import React from "react";
import Links from "@/app/leftside/links";
import About from "@/app/leftside/about";
import Archives from "@/app/leftside/archives";
import Categories from "@/app/leftside/categories";
import Rss from "@/app/leftside/rss";
import Sitemap from "@/app/leftside/sitemap";
import Leftnavbar from "@/app/main/leftnavbar"
import Rightnavbar from "@/app/main/rightnavbar";;
import Draws from "@/app/components/quills";;



export default function TextPage() {
    const {postid} = useParams();

    if (postid === "Home") {
        return <HomePage/>;//如果postid是home，直接返回主页
            } else {
        return (
            <div className="box">
                <Leftnavbar/>
                <div id="fullwindow">
                    <div className="container">
                        <div className="book">
                            {postid === "Links" && <Links/>}
                            {postid === "About" && <About/>}
                            {postid === "Archives" && <Archives/>}
                            {postid === "Categories" && <Categories/>}
                            {postid === "RSS" && <Rss/>}
                            {postid === "SiteMap" && <Sitemap/>}
                        </div>
                    </div>
                </div>
                 <Rightnavbar/>
                <Draws/>
            </div>
        )
    }
}