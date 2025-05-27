import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';


function getDbConfig() {
    return {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'myapp',
        waitForConnections: true,
        connectionLimit: 15,
        connectTimeout: 30000,
        idleTimeout: 10000,
        queueLimit: 0,
        timezone: '+08:00',
        charset: 'utf8mb4_unicode_ci'
    };
}

const pool = mysql.createPool(getDbConfig());

let retryCount = 0;
const MAX_RETRIES = 3;

async function testConnection() {
    try {
        const conn = await pool.getConnection();
        console.log('✅ 数据库连接成功');
        conn.release();
        return true;
    } catch (err) {
        console.error('❌ 数据库连接失败:', (err as Error).message);

        if (retryCount < MAX_RETRIES) {
            retryCount++;
            console.log(`⏳ 尝试重连 (${retryCount}/${MAX_RETRIES})...`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            return testConnection();
        }

        throw new Error('数据库连接失败，已达到最大重试次数');
    }
}


testConnection().catch(err => {
    console.error('数据库初始化错误:', err.message);
});


export const mysqlPool = pool;


export const db = drizzle(pool);


export async function closePool() {
    try {
        await pool.end();
        console.log('数据库连接池已关闭');
    } catch (err) {
        console.error('关闭连接池时出错:', (err as Error).message);
    }
}


process.on('SIGTERM', closePool);
process.on('SIGINT', closePool);