import { importUser } from "../model/useModel"
import { checkUsernameExists } from "../model/useModel"
import bcrypt from 'bcrypt';

export const getNewUserPage = (req, res) => {
    res.render('pages/newUser', { title: 'Đăng ký' });
};

export const getLoginPage = (req, res) => {
    res.render('pages/login', { title: 'Đăng nhập' });
};

export const authAccount = (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
}

export const createUser = async (req, res) => {
    const { fullname, username, password, gender, email, address, role } = req.body
    console.log('Thông tin đăng ký giai đoạn 1: ', req.body )

    const isUsernameAvailable = await checkUsernameExists(username)
    if (!isUsernameAvailable) {
        return res.status(400).json({ message: 'Tên người dùng đã tồn tại' })
    }
    
    if (!username || !password) {
        return res.status(400).json({ message: 'Username và password là bắt buộc' })
    }

    const hashedPassword = await hashPassword(password)
    console.log(console.log('Mật khẩu đã băm giai đoạn 2: ', hashedPassword ))
  
    try {
        importUser(username, hashedPassword, fullname, gender, email, address, role)
        return res.status(201).json({ message: 'Tạo người dùng thành công' })
    } catch (error) {
      console.error('Lỗi tạo người dùng:', error)
      return res.status(500).json({ message: 'Đã có lỗi xảy ra' })
    }
}

const hashPassword = async (password) => {
    const saltRounds = 10
    try {
        return await bcrypt.hash(password, saltRounds)
    } catch (error) {
        console.error('Lỗi khi hash mật khẩu:', error)
        throw new Error('Không thể hash mật khẩu')
    }
}