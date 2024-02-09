import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    image: String,
    price: String,
    arLink: String
})

const ProductModel = mongoose.model('Product', productSchema, 'Product');

export default ProductModel;