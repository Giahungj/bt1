import { getSessionData } from "../middleware/authMiddleware"
import { getTotalProducts } from "../model/productModel"
import { getProducts } from "../model/productModel"

export const getProductListPage = async (req, res) => {
    try {
        const sessionData = getSessionData(req);

        if (!sessionData) {
            return res.redirect('/login');
        }
        const { usernameSession, roleSession } = sessionData;

        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const products = await getProductListData(offset, limit);
        const totalProducts = await getTotalProducts();
        const totalPages = Math.ceil(totalProducts / limit);

        res.render('layout', {
            page: 'pages/listProduct',
            title: 'Danh sách sản phẩm',
            deleteErrorMessage: '',
            deleteSuccessMessage: '',
            products: products,
            currentPage: page,
            totalPages,
            offset,
            usernameSession,
            roleSession,
        });
    } catch (error) {
        console.error(error);
    }
};

export const getProductListData = async (offset, limit) => {
    const products = await getProducts(offset, limit);
    const formattedProducts = products.map(product => {
        return {
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            created_at: product.created_at,
            updated_at: product.updated_at
        };
    });
    
    return formattedProducts;
};
