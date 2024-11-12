export const getContactPage = (req, res) => {
    res.render('layout', { page: 'pages/contact', title: 'Liên hệ' });
};