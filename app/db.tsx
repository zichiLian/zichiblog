import mysql from 'mysql2/promise';



function getConfig() {
    return {
        host: process.env.DB_HOST,
        port:Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
}

let retryCount = 0;
const MAX_RETRIES = 3;

async function testConnection() {
    try {
        const conn = await pool.getConnection();
        console.log('✅ 数据库连接成功');
        conn.release();
    } catch (err) {
        console.error('❌ 数据库连接失败:');
        if (retryCount < MAX_RETRIES) {
            retryCount++;
            setTimeout(testConnection, 5000);
        }
    }
}

// 启动时立即测试连接
testConnection();//错误处理

const config = getConfig();

const pool = mysql.createPool({
        host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: 15,
    connectTimeout: 30000, // 连接超时10秒
    idleTimeout: 10000,    // 空闲超时30秒
    queueLimit: 0,
    timezone: '+08:00',
    charset: 'utf8mb4_unicode_ci'
});



export default pool;
