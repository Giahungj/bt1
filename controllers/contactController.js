import { getSessionData } from "../middleware/authMiddleware"

export const getContactPage = (req, res) => {
    const sessionData = getSessionData(req)

    if (!sessionData) {
        return res.render('layout', {
            page: 'pages/contact', 
            title: 'Liên hệ',
            usernameSession: '',
            roleSession: ''
        })
    }
    const { usernameSession, roleSession } = sessionData

    return res.render('layout', {
        page: 'pages/contact', 
        title: 'Liên hệ',
        usernameSession,
        roleSession
     })
}