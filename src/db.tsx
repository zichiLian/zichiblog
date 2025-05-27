import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';


const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'myapp',
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 30000,
    idleTimeout: 60000,
    timezone: '+08:00',
    charset: 'utf8mb4_unicode_ci'
});


export async function withConnection<T>(fn: (conn: mysql.PoolConnection) => Promise<T>): Promise<T> {
    const conn = await pool.getConnection();
    try {
        const result = await fn(conn);
        return result;
    } finally {
        conn.release(); // 确保无论如何都会释放连接
    }
}


export const db = drizzle(pool, {
    logger: true,
    mode: 'default'
});


export async function safeQuery<T>(query: Promise<T>): Promise<T> {
    return withConnection(async () => {
        try {
            return await query;
        } catch (err) {
            console.error('查询失败:', err);
            throw err;
        }
    });
}

