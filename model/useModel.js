import userController from '../controllers/UserController'
import { connect } from '../connect'

export const importUser = async ( username, password, fullname, address, gender, email, role ) => {
    try {
        const connection = await connect()
        const [result] = await connection.execute('INSERT INTO users (username, password, fullname, address, sex, email, groupid) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [username, password, fullname, address, gender, email, role])
        console.log('Đã thêm người dùng mới:', username)

        if (result.affectedRows > 0) {
            return true 
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
    }
}

export const checkUsernameExists = async (username) => {
    try {
        const connection = await connect()
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        )
        return rows.length === 0
    } catch (error) {
        console.error(error)
        return false
    }
}

export const checkEmailExists = async (email) => {
    try {
        const connection = await connect()
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )
        return rows.length === 0
    } catch (error) {
        console.error(error)
        return false
    }
}

export const getHashPassword = async (username) => {
    try {
        const [rows] = await (await connect()).execute('SELECT password FROM users WHERE username = ?', [username])
    
        if (!rows.length) return false
        
        return rows[0].password
    } catch (error) {
        console.error('Lỗi kiểm tra mật khẩu:', error)
        return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại' }
    }
}

export const getUsers = async (offset, limit) => {
    try {
        const connection = await connect()
        const [rows] = await connection.execute('SELECT fullname, username, sex, email, address, groupid FROM users LIMIT ? OFFSET ?',
            [limit, offset]
        )
        return rows
    } catch (error) {
        console.error('Lỗi khi lấy Danh sách tài khoản:', error)
        return []
    }
}

export const getDetailUserModel = async (username) => {
    try {
        const connection = await connect()
        const [row] = await connection.execute('SELECT fullname, username, sex, email, address, groupid FROM users WHERE username = ?', [username])
        return row[0]
    } catch (error) {
        console.error('Lỗi khi lấy Danh sách tài khoản:', error)
        return []
    }
}

export const updateUserModel = async (username, { fullname, sex, email, address, groupid }) => {
    try {
        const connection = await connect()
        const query = `
            UPDATE users 
            SET fullname = ?, sex = ?, email = ?, address = ?, groupid = ? 
            WHERE username = ?`
        const [result] = await connection.execute(query, [fullname, sex, email, address, groupid, username])
        return result.affectedRows > 0
    } catch (error) {
        console.error('Lỗi khi cập nhật người dùng:', error)
        return false
    }
}

export const getTotalUsers = async () => {
    try {
        const connection = await connect();
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM users')
        return rows[0].count
    } catch (error) {
        console.error('Lỗi khi lấy tổng số người dùng:', error)
        return 0
    }
}

export const deleteUserModel = async (username) => {
    try {
        const connection = await connect();
        const query = 'DELETE FROM users WHERE username = ?';
        const [result] = await connection.execute(query, [username]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        return false;
    }
}
