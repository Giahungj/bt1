export const get404Page = (req, res) => {
    res.render('layout', { page: 'pages/404', title: 'Trang không tồn tại' });
};