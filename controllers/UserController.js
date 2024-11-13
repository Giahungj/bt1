import { importUser } from "../model/useModel"
import { checkUsernameExists } from "../model/useModel"
import { checkEmailExists } from "../model/useModel"
import { getHashPassword } from "../model/useModel"
import bcrypt from 'bcrypt';

export const getNewUserPage = (req, res) => {
    res.render('pages/newUser', { title: 'Đăng ký', successMessage: '', errorMessage: '' });
};

export const getLoginPage = (req, res) => {
    res.render('pages/login', { title: 'Đăng nhập', errorMessage: '' });
};

export const authAccount = async (req, res) => {
    const { username, password } = req.body
    
    if (!username || !password) {
        return res.render('pages/login', { title: 'Đăng nhập', errorMessage: 'Vui lòng nhập đầy đủ thông tin!' })
    }
    
    const isUsernameAvailable = await checkUsernameExists(username)
    if (isUsernameAvailable) {
        return res.render('pages/login', { title: 'Đăng nhập', errorMessage: 'Tài khoản này không tồn tại!' })
    }

    const hashPassword =  await getHashPassword(username)
    const isPasswordValid = await comparePassword(password, hashPassword)
    if (isPasswordValid) {
        return res.redirect('/')
    } else {
        return res.render('pages/login', { title: 'Đăng nhập', errorMessage: 'Sai mật khẩu' })
    }
}

export const createUser = async (req, res) => {
    const { fullname, username, password, gender, email, address, role } = req.body
    console.log('Thông tin đăng ký giai đoạn 1: ', req.body )

    const isUsernameAvailable = await checkUsernameExists(username)
    if (!isUsernameAvailable) {
        return res.render('pages/newUser', { title: 'Đăng ký', successMessage: '', errorMessage: 'Tài khoản đã được sử dụng' })
    }

    const isEmailAvailable = await checkEmailExists(email)
    if (!isEmailAvailable) {
        return res.render('pages/newUser', { title: 'Đăng ký', successMessage: '', errorMessage: 'Email đã được sử dụng' })
    }

    if (!username || !password) {
        return res.render('pages/newUser', { title: 'Đăng ký', successMessage: '', errorMessage: 'Tên tài khoản và Mật khâủ là bắt buộc' })
    }

    const hashedPassword = await hashPassword(password)
    console.log('Mật khẩu đã băm giai đoạn 2: ', hashedPassword )
  
    try {
        const result = importUser(username, hashedPassword, fullname, address, gender, email, role)
        if (!result) {
            return res.render('pages/newUser', { title: 'Đăng ký', successMessage: '', errorMessage: 'Tạo tài khoản thất bại!' })
        }
        return res.render('pages/newUser', { title: 'Đăng ký', successMessage: 'Tạo tài khoản thành công', errorMessage: '' })
    } catch (error) {
        console.error('Lỗi tạo người dùng:', error)
        res.render('pages/newUser', { title: 'Đăng ký', errorMessage: error })
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

export const comparePassword = async (password, hashPassword) => {
    try {
        return await bcrypt.compare(password, hashPassword)
    } catch (error) {
        console.error('Lỗi khi so sánh mật khẩu:', error)
        return false
    }
  }
  