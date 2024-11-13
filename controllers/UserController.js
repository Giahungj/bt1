import { importUser } from "../model/useModel"
import { checkUsernameExists } from "../model/useModel"
import { checkEmailExists } from "../model/useModel"
import { getHashPassword } from "../model/useModel"
import { getUsers } from "../model/useModel"
import { getDetailUserModel } from "../model/useModel"
import { getTotalUsers } from "../model/useModel"
import { updateUserModel } from "../model/useModel"
import { deleteUserModel } from "../model/useModel"
import bcrypt from 'bcrypt';
import { get404Page } from "./404Controller"

export const getNewUserPage = (req, res) => {
    res.render('pages/newUser', { title: 'Đăng ký', successMessage: '', errorMessage: '' });
}

export const getLoginPage = (req, res) => {
    res.render('pages/login', { title: 'Đăng nhập', errorMessage: '' });
}

export const getUserListPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = 2
    const offset = (page - 1) * limit
    
    const users = await getUserListData(offset, limit)
    const totalUsers = await getTotalUsers()
    const totalPages = Math.ceil(totalUsers / limit)
    res.render('layout', {
        page: 'pages/listUser',
        title: 'Danh sách tài khoản',
        deleteErrorMessage: '',
        deleteSuccessMessage: '',
        users: users,
        currentPage: page,
        totalPages,
        offset
    })
}

export const getDetailUserPage = async (req, res) => {
    const { username } = req.params
    const user = await getDetailUserData(username)
    res.render('layout', { page: 'pages/detailUser', title: 'Chi tiết người dùng', errorMessage: '', user: user });
}

export const getEditUserPage = async (req, res) => {
    const { username } = req.params
    const user = await getDetailUserData(username)
    return res.render('layout', { page: 'pages/editUser',
        title: 'Thay đổi thông tin người dùng',
        updateErrorMessage: '',
        updateSuccessMessage: '',
        user: user });
}

export const updateUser = async (req, res) => {
    let { username, fullname, sex, email, address, groupid } = req.body

    if (!username || !fullname || !sex || !email || !address || !groupid) {
        return res.status(400).send('Thiếu thông tin cần thiết')
    }

    if (groupid === 'Admin') {
        groupid = 1
    } else if (groupid === 'User') {
        groupid = 2
    } else {
        return res.render('layout', { 
            page: 'pages/editUser', 
            title: 'Chi tiết người dùng', 
            updateErrorMessage: 'Giá trị quyền không hợp lệ', 
            updateSuccessMessage: '', 
            user: userDetails 
        })
    }

    if (sex === 'Nam') {
        sex = 'Male'
    } else if (sex === 'Nữ') {
        sex = 'Female'
    } else if (sex === 'Khác') {
        sex = 'Other'
    } else {
        return res.render('layout', { 
            page: 'pages/editUser', 
            title: 'Chi tiết người dùng', 
            updateErrorMessage: 'Giá trị giới tính không hợp lệ', 
            updateSuccessMessage: '', 
            user: userDetails 
        })
    }

    const updateResult = await updateUserModel(username, { fullname, sex, email, address, groupid })
    const userDetails = await getDetailUserData(username)

    if (!updateResult) {
        return res.render('layout', { 
            page: 'pages/editUser', 
            title: 'Chi tiết người dùng', 
            updateErrorMessage: 'Có lỗi xảy ra khi cập nhật', 
            updateSuccessMessage: '', 
            user: userDetails 
        })
    }

    return res.render('layout', { 
        page: 'pages/editUser', 
        title: 'Chi tiết người dùng', 
        updateErrorMessage: '', 
        updateSuccessMessage: 'Cập nhật thành công', 
        user: userDetails 
    })
}

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

export const getUserListData = async (offset, limit) => {
    const users = await getUsers(offset, limit)
    const formattedUsers = users.map(user => {
        return {
            fullname: user.fullname,
            username: user.username,
            sex: user.sex === 'male' ? 'Nam' : user.sex === 'female' ? 'Nữ' : user.sex,
            email: user.email,
            address: user.address,
            groupid: user.groupid === 1 ? 'Admin' : user.groupid === 2 ? 'User' : 'Unknown'
        }
    })
    
    return formattedUsers
}

export const getDetailUserData = async (username) => {
    try {
        const user = await getDetailUserModel(username)
        const formattedUser = {
            fullname: user.fullname,
            username: user.username,
            sex: user.sex === 'male' ? 'Nam' : user.sex === 'female' ? 'Nữ' : user.sex,
            email: user.email,
            address: user.address,
            groupid: user.groupid === 1 ? 'Admin' : user.groupid === 2 ? 'User' : 'Unknown'
        }
        
        return formattedUser
    } catch (error) {
        console.error('Lỗi xem nguời dùng:', error)
    }
    
}

export const deleteUser = async (req, res) => {
    const { username } = req.params
    try {
        const isDeleted = await deleteUserModel(username)
        if (isDeleted) {
            return res.redirect('/list-user')
        } else {
            res.redirect('/list-user?deleteErrorMessage=Không thể xóa người dùng')
        }
    } catch (error) {
        console.error(error)
        return get404Page
    }
}
