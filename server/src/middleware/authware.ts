import "dotenv/config"
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET ;
import { UserModel } from "../db";
import { userDocType } from "../types/types";

interface payloadType { id: string, email: string }
interface dotUser { user: userDocType }

const validateUser = async (req:Request & dotUser, res:Response, next:NextFunction) => {
    try {
        const { token } = req.body;
        if (!token){
            return res.status(404).json({success: false, msg: "User not logged in"})
        }
        const { id , email } = jwt.verify(token,SECRET) as payloadType ;
        
        // If payload is broken or user data is deleted
        if (!id || !email){
            return res.status(404).json({success: false, valid: false, msg: "Please login again"})
        }
        const user = await UserModel.findOne({_id: id, email: email}) ;
        if (!user){
            return res.status(404).json({success: false, valid: false, msg: "Please login again"})
        }

        req.user = user;
        next();
    }
    catch(err) {
        console.log(":: Error in validateUser(authware.ts) ::\n",err) ;
        return res.status(404).json({success: false, msg: "Server error"}) ;
    }
}

export default validateUser;