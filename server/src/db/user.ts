import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwd: String
})

const UserModel = mongoose.model('User',userSchema,'User') ;

export default UserModel;