import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    parentCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', defualt: null}
}, {
    timestamps: true
});

export default mongoose.model('Category', categorySchema);