'use client'
import Midwindow from './main/midwindow'
import React, {useEffect} from "react";



export  default function HomePage() {
    useEffect(() => {
        localStorage.setItem("tags",JSON.stringify([12,32,3223231]));
    },[]);


    return (
   <>
       <Midwindow />
   </>
  );
}