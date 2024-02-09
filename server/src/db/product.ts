import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    image: String,
    price: String,
    arLink: String,
    keywords: Array,
    createdAt: { type: Date, default: Date.now }
})

const ProductModel = mongoose.model('Product', productSchema, 'Product');

export default ProductModel;