'use client'
import React, {useEffect, useState} from 'react'
import Link from "next/link";



export default function Navbar() {


    const [naver,setNaver] = useState([])

    useEffect(() => {
    fetch('/api/Navers')
        .then(response =>{if(!response.ok){
          console.log('请求失败')
        }
          return response.json();
        })
        .then((response) => {
          setNaver(response.data)
        })
  },
        []);




    return (
    <>
    <ul className="info-list" key="{data.id}">
        <li><span><img src={`/icons/home.svg`}/></span><Link href={'/'}>Home</Link></li>
    {
        naver.map(({id, name, svg})=>
    <li key={id}><span><img src={`/icons/${svg}`}/></span><Link href={`/leftside/${name}`}>{name}</Link></li>
    )}
    </ul>

</>
  )
}