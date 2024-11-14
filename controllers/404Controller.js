import { getSessionData } from "../middleware/authMiddleware"

export const get404Page = (req, res) => {
    const sessionData = getSessionData(req)

    if (!sessionData) {
        return res.redirect('/login')
    }
    const { usernameSession, roleSession } = sessionData
    res.render('layout', { 
        page: 'pages/404', 
        title: 'Trang không tồn tại',
        usernameSession,
        roleSession
    })
}