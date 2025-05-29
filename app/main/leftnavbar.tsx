import React from 'react'
import Navbar from './left-nav/navbar'
import Userinfo from './left-nav/userinfo'
import Darkmode from '@/app/components/darkmode'
import Login from '@/app/components/login'


export default function Leftnavbar() {



  return (
      <div className = "left-side">
    <div className="container">
     <Userinfo/>
    <Navbar/>
      <Darkmode/>
        <Login/>
    </div>
</div>
  )
}
