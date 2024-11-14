import { getSessionData } from "../middleware/authMiddleware"

export const getAboutPage = (req, res) => {
    const sessionData = getSessionData(req)

    if (!sessionData) {
        return res.render('layout', {
            page: 'pages/about', 
            title: 'Về trang web',
            usernameSession: '',
            roleSession: ''
        })
    }
    const { usernameSession, roleSession } = sessionData

    return res.render('layout', {
        page: 'pages/about', 
        title: 'Về trang web',
        usernameSession,
        roleSession
     })
}