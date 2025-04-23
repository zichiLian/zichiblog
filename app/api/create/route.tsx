import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // 数据库配置（建议使用.env环境变量）
    const dbConfig = {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '123456',
        database: 'blog',
        port: Number(process.env.MYSQL_PORT) || 3306,
        waitForConnections: true,
        connectionLimit: 2
    };

    let connection;
    try {
        // 创建连接池
        const pool = mysql.createPool(dbConfig);
        connection = await pool.getConnection();

        // 验证步骤1：基础连接测试
        const [pingResult] = await connection.query('SELECT 1 + 1 AS result');

        // 验证步骤2：检查user表结构
        const [tableDesc] = await connection.query(`
      DESCRIBE user
    `);

        // 验证步骤3：获取示例数据
        const [sampleData] = await connection.query(`
      SELECT 
          * 
      FROM 
          user 
        LIMIT 2 
    `);

        // 返回验证结果
        res.status(200).json({
            success: true,
            connection: {
                host: dbConfig.host,
                port: dbConfig.port,
                database: dbConfig.database
            },
            tests: {
                basic_math: pingResult[0].result === 2 ? 'PASSED' : 'FAILED',
                table_exists: tableDesc.length > 0 ? 'PASSED' : 'FAILED',
                columns: tableDesc.map(col => ({
                    field: col.Field,
                    type: col.Type,
                    null: col.Null,
                    key: col.Key
                })),
                sample_data: sampleData
            }
        });

    } catch (error) {
        // 错误处理
        const errorInfo = {
            code: error.code || 'UNKNOWN_ERROR',
            message: error.message,
            sqlState: error.sqlState,
            fatal: error.fatal,
            connectionConfig: {
                host: dbConfig.host,
                port: dbConfig.port,
                database: dbConfig.database
            }
        };

        // 特定错误处理
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            errorInfo.message = `数据库认证失败，请检查用户名/密码 (当前用户：${dbConfig.user})`;
        }

        if (error.code === 'ER_BAD_DB_ERROR') {
            errorInfo.message = `数据库不存在：${dbConfig.database}`;
        }

        if (error.code === 'ER_NO_SUCH_TABLE') {
            errorInfo.message = `表不存在：${dbConfig.database}.user`;
        }

        res.status(500).json({
            success: false,
            error: errorInfo
        });

    } 
}
