import React from 'react'
import Navbar from './left-nav/navbar'
import Userinfo from './left-nav/userinfo'
import Darkmode from '@/app/components/darkmode'
import Homepage from "@/app/homepage";
import Link from "next/link";
import Login from '@/app/components/login'
import {Button} from "antd";


export default function Leftnavbar() {

  const fetchUsers = async () => {
    const res = await fetch('./api/sql/users');
    const data = await res.json();
    // 使用 data
  };


  const createUser = async (userData: any) => {
    const res = await fetch('./api/sql/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    // 使用 data
  };


  return (
      <div className = "left-side sticky">
    <div className="container">
     <Userinfo/>
    <Navbar/>
      <Darkmode/>
        <Login/>
    </div>
</div>
  )
}
