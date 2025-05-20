import mysql from 'mysql2/promise';



function getConfig() {
    return {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
}


const config = getConfig();

const pool = mysql.createPool({
        host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: 500,
    connectTimeout: 60000, // 连接超时10秒
    idleTimeout: 30000,    // 空闲超时30秒
    queueLimit: 0,
    timezone: '+08:00',
    charset: 'utf8mb4_unicode_ci'
});

// 增强心跳机制（每25秒发送一次）
setInterval(() => {
    pool.query('SELECT 1')
        .then(() => console.log( new Date()))
        .catch(err => console.error('Failed:', err.message));
},1000000);

export default pool;
