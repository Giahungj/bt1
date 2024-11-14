export const createSession = (req, usernameSession, roleSession) => {
    if (!usernameSession || !roleSession) {
        throw new Error('Username or role is invalid')
    }
    req.session.usernameSession = usernameSession
    req.session.roleSession = roleSession
}

export const getSessionData = (req) => {
    const { usernameSession, roleSession } = req.session || {}
    if (!usernameSession || !roleSession) {
        return null
    }
    return { usernameSession, roleSession }
}

export const isAdmin = (req, res, next) => {
    if (!req.session || !req.session.roleSession || !req.session.usernameSession) {
        return res.redirect('/login')
    }
    const { usernameSession, roleSession } = req.session || {}
    if (roleSession !== 'Admin') {
        return res.render('layout', { page: 'pages/404', title: 'Trang không tồn tại', usernameSession, roleSession })
    }
    next()
}