import Category from '../models/Category.js';

export const createCategory = async(req, res) => {
    try{
        const {name, description, parentCategory} = req.body;

        const category = new Category({
            name,
            description,
            parentCategory
        });

        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    }catch(error){
        console.error(error);
        if(error.code === 11000){
            return res.status(400).json({message: "Category already exists"});
        }
        res.status(500).json({message: "Failed to create category", error: error.message});
    }
}

export const getCategories = async(req, res) => {
    try{
        const categories = await Category.find().populate('parentCategory', 'name');
        res.json(categories);
    }catch(error){
        console.error(error);
        res.status(500).json({message :"Failed to fetch categories."})
    }
}