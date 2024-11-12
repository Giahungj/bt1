import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'demowebnangcao',
};

// Hàm kết nối đến MySQL
export const connect = async () => {
    try {
        const connection = await mysql.createConnection(config)
        console.log('connect - Đã kết nối đến DB', config.database)
        return connection
    } catch (error) {
        console.error("Lỗi:", error)
        throw error
    }
};
