export const getAboutPage = (req, res) => {
    res.render('layout', { page: 'pages/about', title: 'Về trang web' });
};