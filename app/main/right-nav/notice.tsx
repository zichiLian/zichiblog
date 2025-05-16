'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link';

export default function Notice() {



    // 安全转换类型为数组




    return (
        <div>
            <div className="notice-icon"><img src="../icons/hourglass_empty_24dp_1F1F1F.svg"/></div>
        <div className="notice-container">
            <div>
                <h2>布告栏</h2>
                <p>最近休息中</p>
                <a href='https://space.bilibili.com/24442474'>B站点点关注</a>
            </div>
        </div>
        </div>
            )
}

