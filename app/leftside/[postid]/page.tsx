'use client';
import '../../index.css'
import {useParams} from "next/navigation";
import React from "react";
import Links from "@/app/leftside/links";
import About from "@/app/leftside/about";
import Archives from "@/app/archives/[postid]/post";
import Post from "@/app/leftside/categories";
import Rss from "@/app/leftside/rss";
import Rightnavbar from "@/app/main/rightnavbar";



export default function TextPage() {
    const {postid} = useParams();



        return (
            <>
                            {postid === "Links" &&
                                <>
                                <div className="box">
                                    <div id="fullwindow">
                                        <div className="container">
                                <Links/>
                                        </div>
                                    </div>
                                </div>
                                <div className ="link-right-side">
                                <div className="container">
                                </div>
                                </div>
                            </>}
                            {postid === "About" &&                                 <>
                                <div className="box">
                                    <div id="fullwindow">
                                        <div className="container">
                                            <About/>
                                        </div>
                                    </div>
                                </div>
                                <div className ="link-right-side">
                                    <div className="container">
                                    </div>
                                </div>
                            </>}
                            {postid === "Archives" &&
                                <>
                       <div className="box">
                           <div id="fullwindow">
                               <div className="container">
                                <Archives/>
                               </div>
                           </div>
                       </div>
                         <Rightnavbar/>
                                </>}
                            {postid === "Categories" &&
                                <>
                                    <div className="box">
                                        <div id="fullwindow">
                                            <div className="container">
                                                <Post/>
                                            </div>
                                        </div>
                                    </div>
                                    <Rightnavbar/>
                                </>
                            }
                            {postid === "RSS" && <Rss/>}
            </>

        )

}