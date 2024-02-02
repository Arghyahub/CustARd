import 'dotenv/config'
import Express , { Request, Response } from "express"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const SECRET = process.env.SECRET
import { UserModel } from "../db";
import validateUser from '../middleware/authware';
import { userDocType } from '../types/types';

const router = Express() ;

interface signupParam {name:string,email:string,passwd:string};
interface loginParam { email:string, passwd: string }
interface RequestWithUser extends Request { user: userDocType }

router.post('/signup', async (req:Request, res:Response)=> {
    try{
        const { name , email, passwd }:signupParam = req.body ;
        if (!name || !email || !passwd){
            return res.status(400).json({success: false, msg: 'All fields not provided'}) ;
        }
    
        // Check if user already exists
        const findUser = await UserModel.findOne({email}) ;
        if (findUser){
            return res.status(403).json({success: false, msg: 'Account already exists'}) ;
        }
    
        // This is a new user, hash the password
        const hashedPassword = await bcrypt.hash(passwd,10) ;
    
        const newUser = await UserModel.create({name,email,passwd: hashedPassword}) ;
        await newUser.save();
        
        // Generate token for client
        const payload = {
            id: newUser._id,
            email: email
        }
    
        const token = jwt.sign(payload,SECRET) ;
        return res.status(200).json({success: true, msg: 'Account successfully created', token: token}) ;
    }
    catch(err) {
        console.log(":: Error in Signup (auth.ts) ::\n",err) ;
        res.status(500).json({success: false, msg: 'Internal server error'}) ;
    }
})

router.post('/login',async (req:Request, res:Response)=> {
    try {
        const { email, passwd }:loginParam = req.body ;

        console.log(email,passwd) ;
        
        if (!email || !passwd){
            return res.status(404).json({success: false, msg: "Some fields are empty"})
        }
        const user = await UserModel.findOne({email: email}) ;
        if (!user){
            return res.status(404).json({success: false, valid: false, msg: "User not found"})
        }

        const passwdMatch = await bcrypt.compare(passwd,user.passwd) ;
        if (!passwdMatch){
            return res.status(401).json({success: false, msg: "Wrong password"}) ;
        }
        const payload = {
            id: user._id,
            email: email
        }
        const token = jwt.sign(payload,SECRET) ;

        return res.status(200).json({success: true, token: token, msg: "Successfully logged in"})
    } catch (error) {
        console.log(":: /login(auth.ts) ::\n",error) ;
        return res.status(200).json({success: false, msg: "Internal server error"})
    }
})

router.post('/validate',validateUser,(req: RequestWithUser ,res)=> {
    res.status(200).json({user: req.user}) ;
})


export default router