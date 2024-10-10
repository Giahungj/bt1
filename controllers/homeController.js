export const getHomePage = (req, res) => {
    res.render('layout', { page: 'pages/home' });
};