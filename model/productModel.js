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

export const addProduct = async (productName, productDescription, productPrice) => {
    try {
        const connection = await connect()
        const [result] = await connection.execute(
            'INSERT INTO products (name, description, price) VALUES (?, ?, ?)', 
            [productName, productDescription, productPrice]
        )
        return result
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error)
        throw error
    }
}

export const getDetailProductData = async (productname) => {
    try {
        const connection = await connect()
        const [row] = await connection.execute('SELECT * FROM products WHERE name = ?', [productname])
        return row[0]
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const updateProductModel = async (productName, productDescription, productPrice) => {
    try {
        const connection = await connect()
        const query = `
            UPDATE users 
            SET fullname = ?, sex = ?, email = ?, address = ?, groupid = ? 
            WHERE username = ?`
        const [result] = await connection.execute(query, [fullname, sex, email, address, groupid, productName])
        return result.affectedRows > 0
    } catch (error) {
        console.error('Lỗi khi cập nhật người dùng:', error)
        return false
    }
}