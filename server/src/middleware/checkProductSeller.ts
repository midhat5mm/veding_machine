import Product from "../database/models/Product";

export const checkProductSeller = async (req, res, next) => {
    const user = req.user;
    const { id } = req.body;
    if (!id) {
        res.status(400).json('Invalid input')
    }

    const product = await Product.findById({
        _id: id
    }).lean();    

    //@ts-ignore
    if (product?.sellerId?.toString() && product.sellerId.toString() === user._id.toString()) {
        next()
    }
    else {
        res.status(401).json('Not authorized')
    }
};
