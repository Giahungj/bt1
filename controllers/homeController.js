import { getSessionData } from "../middleware/authMiddleware"
import { getUserListData } from "./UserController"
import { getTotalUsers } from "../model/useModel"

export const getHomePage = async (req, res) => {
    // Kiểm tra sessionData trước khi truy xuất thuộc tính
    const sessionData = getSessionData(req)
    const usernameSession = sessionData ? sessionData.usernameSession : ''
    const roleSession = sessionData ? sessionData.roleSession : ''
    
    // Xác định trang, số lượng mục trên mỗi trang và vị trí bắt đầu
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const offset = (page - 1) * limit

    try {
        // Lấy danh sách người dùng và tổng số người dùng để phân trang
        const users = await getUserListData(offset, limit)
        const totalUsers = await getTotalUsers()
        const totalPages = Math.ceil(totalUsers / limit)

        // Render trang với các dữ liệu cần thiết
        return res.render('layout', {
            page: 'pages/home',
            title: 'Trang chủ',
            deleteErrorMessage: '',
            deleteSuccessMessage: '',
            users,
            currentPage: page,
            totalPages,
            offset,
            usernameSession,
            roleSession,
        })
    } catch (error) {
        console.error('Lỗi khi tải danh sách người dùng:', error)
        res.status(500).send("Đã xảy ra lỗi trong quá trình tải trang chủ")
    }
}
