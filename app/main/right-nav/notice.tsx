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
                <p>最近休息中</p>
                <a href='https://space.bilibili.com/24442474'>点我去到哔哩哔哩！</a>
            </div>
        </div>
        </div>
            )
}

