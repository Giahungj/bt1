import { connect } from '../connect'

export const getProducts = async (offset, limit) => {
    try {
        const connection = await connect()
        const [rows] = await connection.execute(
            'SELECT id, name, description, price, quantity, created_at, updated_at FROM products LIMIT ? OFFSET ?',
            [limit, offset]
        )
        return rows
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error)
        return [];
    }
}

export const getTotalProducts = async () => {
    try {
        const connection = await connect();
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM products')
        return rows[0].count
    } catch (error) {
        console.error('Lỗi khi lấy tổng số người dùng:', error)
        return 0
    }
}