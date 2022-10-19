import Product from "../database/models/Product";

const getProduct = async function (req, res) {
    // would be better if id is in params..

    const { id } = req.body;
    if (!id) {
        res.status(400).json('Invalid input')
    }
    const product = await Product.findById({
        _id: id
    })

    if (!product) {
        res.status(201).json('Not found')
    }
    else {
        res.status(200).json(product);
    }
};

const postProduct = async function (req, res) {
    const { amountAvailable, cost, productName } = req.body;
    if (!amountAvailable || !cost || !productName) {
        res.status(400).json('Invalid input')
    }
    const product = await Product.create({
        amountAvailable,
        cost,
        productName,
        sellerId: req.user._id
    })
    res.status(200).json(product);
};

const putProduct = async function (req, res) {
    // would be better if id is in params..
    const { id, amountAvailable, cost, productName } = req.body;

    if (!id) {
        res.status(400).json('Invalid input')
    }

    const product = await Product.findByIdAndUpdate(
        {
            _id: id,
        },
        {
            $set: {
                ...(amountAvailable ? { amountAvailable } : {}),
                ...(cost ? { cost } : {}),
                ...(productName ? { productName } : {}),
            }
        },
        {
            new: true
        }
    )
    res.status(200).json(product);
};

const deleteProduct = async function (req, res) {
    // would be better if id is in params..
    const { id } = req.body;
    if (!id) {
        res.status(400).json('Invalid input')
    }

    const product = await Product.deleteOne({
        _id: id
    })

    res.status(200).json(product);
};


export const productController = {
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
}