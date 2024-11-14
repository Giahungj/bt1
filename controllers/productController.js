import { getSessionData } from "../middleware/authMiddleware"
import { addProduct, getTotalProducts } from "../model/productModel"
import { getProducts } from "../model/productModel"
import { getDetailProductData } from "../model/productModel"


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
}

export const getEditProductPage = async (req, res) => {
    try {
        const sessionData = getSessionData(req)

        if (!sessionData) {
            return res.redirect('/login')
        }
        const { usernameSession, roleSession } = sessionData

        const { productname } = req.params
        const product = await getDetailProductData(productname)
        return res.render('layout', { 
            page: 'pages/editProduct',
            title: 'Thay đổi thông tin sản phẩm',
            updateErrorMessage: '',
            updateSuccessMessage: '',
            product: product,
            usernameSession,
            roleSession
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const updateProduct = async (req, res) => {
    const sessionData = getSessionData(req)

    if (!sessionData) {
        return res.redirect('/login')
    }
    const { usernameSession, roleSession } = sessionData

    let { productName, productDescription, productPrice } = req.body

    if (!productName || !productDescription || !productPrice) {
        return res.status(400).send('Thiếu thông tin cần thiết')
    }

    const updateResult = await updateProductModel(productName, productDescription, productPrice)
    const productDetails = await getDetailProductData(username)

    if (!updateResult) {
        return res.render('layout', { 
            page: 'pages/editProduct', 
            title: 'Chi tiết sản phẩm', 
            updateErrorMessage: 'Có lỗi xảy ra khi cập nhật', 
            updateSuccessMessage: '', 
            product: productDetails,
            usernameSession,
            roleSession
        })
    }

    return res.render('layout', { 
        page: 'pages/editProduct', 
        title: 'Chi tiết sản phẩm', 
        updateErrorMessage: '', 
        updateSuccessMessage: 'Cập nhật thành công', 
        user: productDetails,
        usernameSession,
        roleSession
    })
}

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

export const getAddProductPage = async (req, res) => {
    try {
        const sessionData = getSessionData(req);

        if (!sessionData) {
            return res.redirect('/login');
        }
        const { usernameSession, roleSession } = sessionData;

        res.render('layout', {
            page: 'pages/newProduct',
            title: 'Thêm sản phẩm',
            errorMessage: '',
            successMessage: '',
            usernameSession,
            roleSession,
        });
    } catch (error) {
        console.error(error);
    }
}

export const createProduct = async (req, res) => {
    const sessionData = getSessionData(req)

    if (!sessionData) {
        return res.redirect('/login')
    }
    const { usernameSession, roleSession } = sessionData
    
    const { productName, productDescription, productPrice } = req.body
    const result = await addProduct(productName, productDescription, productPrice)

    if (!result) {
        return res.render('layout', {
            page: 'pages/newProduct',
            title: 'Thêm sản phẩm',
            errorMessage: 'Thêm sản phẩm thất bại vui lòng thử lại!',
            successMessage: '',
            usernameSession,
            roleSession,
        })
    }

    return res.render('layout', {
        page: 'pages/newProduct',
        title: 'Thêm sản phẩm',
        errorMessage: '',
        successMessage: 'Thêm sản phẩm thành công',
        usernameSession,
        roleSession,
    })
}

export const getDetailProductPage = async (req, res) => {
    try {
        const { productname } = req.params
        const product = await getDetailProductData(productname)

        const sessionData = getSessionData(req)

        if (!sessionData) {
            return res.redirect('/login')
        }
        const { usernameSession, roleSession } = sessionData

        res.render('layout', { 
            page: 'pages/detailProduct',
            title: 'Chi tiết sản phẩm',
            errorMessage: '',
            product: product,
            usernameSession,
            roleSession
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}