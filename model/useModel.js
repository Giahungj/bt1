import userController from '../controllers/UserController'
import { connect } from '../connect'

export const importUser = async ( fullname, username, password, gender, email, address, role ) => {
    try {
        const isUsernameAvailable = await checkUsernameExists(username)
        
        if (!isUsernameAvailable) {
            return console.log('Tên người dùng đã tồn tại')
        }
        
        const connection = await connect()

        await connection.execute('INSERT INTO users (username, password, fullname, address, sex, email, groupid) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [username, password, fullname, address, gender, email, role])
        console.log('Đã thêm người dùng mới:', username)
    } catch (error) {
        console.error(error)
    }
}

export const checkUsernameExists = async (username) => {
    try {
        const connection = await connect()
        const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username])
        return rows.length === 0
    } catch (error) {
        console.error(error)
        return false
    }
}
