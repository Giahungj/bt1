import { getSessionData } from "../middleware/authMiddleware"

export const getHomePage = (req, res) => {
    const sessionData = getSessionData(req)

    if (!sessionData) {
        return res.render('layout', {
            page: 'pages/home', 
            title: 'Trang chủ',
            usernameSession: '',
            roleSession: ''
        })
    }
    const { usernameSession, roleSession } = sessionData

    return res.render('layout', {
        page: 'pages/home', 
        title: 'Trang chủ',
        usernameSession,
        roleSession
    })
}