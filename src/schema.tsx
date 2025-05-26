// src/schema.ts
import {
    mysqlTable,
    int,
    varchar,
    text,
    date,
    serial,
    primaryKey
} from 'drizzle-orm/mysql-core';

// 标签表
export const tags = mysqlTable('tags', {
    number: serial('number').primaryKey(), // 自增主键
    id: int('id'),                         // 普通INT字段
    name: varchar('name', { length: 20 }), // 长度限制20的字符串
});

export const cate = mysqlTable('cate', {
    number: serial('number').primaryKey(), // 自增主键
    id: int('id'),                         // 普通INT字段
    name: varchar('name', { length: 20 }), // 长度限制20的字符串
});


// 文章表（带InnoDB引擎和字符集配置）
export const posts = mysqlTable('posts', {
    id: serial('id').primaryKey(),         // 自增主键
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    lasttime: date('lasttime'),            // DATE类型
    time: date('time'),                    // DATE类型
}, (table) => ({
    // 表级配置（引擎和字符集）
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
}));

// 菜单表
export const menu = mysqlTable('menu', {
    id: int('id'),                         // 普通INT字段
    title: varchar('title', { length: 255 }),
    tag: varchar('tag', { length: 60 }),
});