'use client'
import Midwindow from './main/midwindow'
import React, {useEffect} from "react";
import Rightnavbar from "@/app/main/rightnavbar";
import Leftnavbar from "@/app/main/leftnavbar";
import Draws from "@/app/components/quills";

export  default function HomePage() {
    useEffect(() => {
        localStorage.setItem("tags",JSON.stringify([12,32,3223231]));
    },[]);


    return (
   <>
       <Leftnavbar/>
       <Midwindow/>
       <Rightnavbar/>
       <Draws/>
   </>
  );
}