'use client'
import React from 'react';
import {Button} from "antd";
import {useEffect, useState} from 'react'



export default function darkmode() {

    const [isDarkMode, setIsDarkMode] = useState(false);
//设置俩个状态，暗黑模式，和设置暗黑模式
    const onClick = () => {
        setIsDarkMode(!isDarkMode);
    };

    // 动态更新 CSS 变量
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.style.setProperty("--background", "#e5e5ea");
            root.style.setProperty("--text-color", "#112a45");
        } else {
            root.style.setProperty("--background", "#e5e5ea");
            root.style.setProperty("--text-color", "#112a45");
        }

        // 看参数里的theme状态是dark，还是light 判断运行
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, []);

    // console.log(localStorage)
// 动态更新 CSS 变量
useEffect(() => {
    const roots = document.documentElement;
    if (isDarkMode) {
        roots.style.setProperty("--background", "#595959");
        roots.style.setProperty("--text-color", "#141414");
    } else {
        roots.style.setProperty("--background", "#f0f0f4");
        roots.style.setProperty("--text-color", "#112a45");
    }
})
    return (
        <>
        </>
    )
}