import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwd: String,
    role: "seller"
})

const SellerModel = mongoose.model('Seller', sellerSchema, 'Seller');

export default SellerModel;