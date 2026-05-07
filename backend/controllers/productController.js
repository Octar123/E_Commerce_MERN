import Product from '../models/Product.js'

export const createProduct = async(req, res) => {
    try{

        const {title, description, price, stock, category} = req.body;

        const product = new Product({
            title,
            description,
            price,
            stock,
            category,
            vendorId: req.user.id
        });

        const createdProduct = await product.save();

        res.status(201).json(createdProduct);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Failed to create product", error: error.message});
    }
}