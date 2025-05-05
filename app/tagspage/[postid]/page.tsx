'use client';
import '../../index.css';
import { Post } from "@/app/tagspage/[postid]/post";
import { useParams, Params } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Rightnavbar from "@/app/main/rightnavbar";
import Leftnavbar from "@/app/main/leftnavbar";
import Draws from "@/app/components/quills";

interface TextItem {
    id: number;
    title: string;
    tags: string[];
    time: string;
    content: string;
}

interface ResultItem {
    id: number;
    title: string;
    tags: string[];
    time: string;
}

interface TagNetwork {
    [key: string]: Set<string>;
}

const TagsPage = () => {
    const { postid } = useParams<Params>();
    const [text, setText] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/Texts')
            .then(response => {
                if (!response.ok) {
                    console.log('请求失败');
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((response: { data: any[] }) => {
                setText(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const result: ResultItem[] = text
        .map((json: string) => {
            const data = JSON.parse(json);
            return {
                id: data.id,
                title: data.title,
                tags: data.tags || [],
                time: data.time
            };
        })
        .filter(Boolean);

    const allTags = result.flatMap(item => item.tags);
    const allDate = result.flatMap(item => item.time);
    const years = allDate.map(dateTime => dateTime?.split('-')[0] || '');
    const uniqueYears = [...new Set(years)];
    const uniqueTags = [...new Set(allTags)];

    function buildTagNetwork(result: ResultItem[]): TagNetwork {
        const network: TagNetwork = {};

        result.forEach(item => {
            item.tags.forEach((tag: string) => {
                if (!network[tag]) {
                    network[tag] = new Set();
                }
                network[tag].add(item.title);
            });
        });

        return network;
    }

    const tagNetwork = buildTagNetwork(result);
    const tagsid = decodeURIComponent(postid || '');

    const textcontent = tagNetwork[tagsid]
        ? Array.from(tagNetwork[tagsid])
        : [];

    function findIdByTitle(title: string): number | null {
        const article = result.find(item => item.title === title);
        return article?.id || null;
    }

    const textid: (number | null)[] = [];
    textcontent.forEach(item => {
        const articleId = findIdByTitle(item);
        textid.push(articleId);
    });

    const textArray = textcontent.map((text, index) => ({
        id: textid[index],
        content: text
    }));

    return (
        <div className="box">
            <Leftnavbar />
            <div id="fullwindow">
                <div className="container">
                    <div className="book">
                        <div>
                            <h1>{uniqueYears.join(', ')}</h1>
                            <div>CATEGORIES</div>
                            {uniqueTags.map((tag, id) => (
                                <a
                                    onClick={() => console.log(tagNetwork[tag as string])}
                                    href={`/tagspage/${encodeURIComponent(tag as string)}`}
                                    key={id}
                                    className="archives-tags"
                                >
                                    {tag}
                                </a>
                            ))}
                            <div>
                                {textArray.map((item) => (
                                    <Link
                                        href={`/textpage/${item.id}`}
                                        key={item.id}
                                        className="archives-tags"
                                    >
                                        {item.content}
                                        <br/>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Rightnavbar />
            <Draws />
        </div>
    );
};

export default TagsPage;