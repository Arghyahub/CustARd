import 'dotenv/config'
import mongoose , {ConnectOptions} from "mongoose";

const DATABASE = process.env.DATABASE ;
import UserModel from "./user";

const connectDB = async () => {
    try{
        await mongoose.connect(DATABASE,{
            useNewUrlParser : true,
            useUnifiedTopology :true
        } as ConnectOptions)
        console.log("DB connected") ;
    }
    catch(err) {
        console.log("::DB connection error::\n",err) ;
    }
}

export default connectDB;
export {
    UserModel,
    
}