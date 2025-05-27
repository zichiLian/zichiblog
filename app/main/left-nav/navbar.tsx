'use client'
import React from 'react'
import Link from "next/link"
import Image from "next/image"

interface NavItem {
    id: number
    name: string
    svg: string
}

const navItems: NavItem[] = [
    { id: 0, name: "Home", svg: "home.svg" },
    { id: 1, name: "Archives", svg: "archives.svg" },
    { id: 2, name: "Categories", svg: "cate.svg" },
    { id: 3, name: "Links", svg: "links.svg" },
    { id: 4, name: "About", svg: "about.svg" },
]

export default function Navbar() {
    return (
        <ul className="info-list">
            {navItems.map((item) => (
                <li key={item.id}>
                    <Link
                        href={item.name === 'Home' ? '/home' : `/leftside/${item.name}`}
                        className="flex items-center hover:text-blue-500 transition-colors"
                    >
            <span className="mr-2">
              <Image
                  src={`/icons/${item.svg}`}
                  alt={item.name}
                  width={16}
                  height={16}
                  priority={item.id <= 2} // 前三个图标预加载
              />
            </span>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}