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
