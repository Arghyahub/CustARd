import 'dotenv/config'
import Express, { Request, Response } from "express"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const SECRET = process.env.SECRET
import { SellerModel } from "../db";
import { validateSeller } from "../middleware/authware"
import { sellerDocType } from '../types/types';

const router = Express();

interface signupParam { name: string, email: string, passwd: string };
interface loginParam { email: string, passwd: string }
interface RequestWithUser extends Request { user: sellerDocType }

// /signup -> For creating new user
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { name, email, passwd }: signupParam = req.body;
        if (!name || !email || !passwd) {
            return res.status(400).json({ success: false, msg: 'All fields not provided' });
        }

        // Check if user already exists
        const findUser = await SellerModel.findOne({ email });
        if (findUser) {
            return res.status(403).json({ success: false, msg: 'Account already exists' });
        }

        // This is a new user, hash the password
        const hashedPassword = await bcrypt.hash(passwd, 10);

        const newUser = await SellerModel.create({ name, email, passwd: hashedPassword, role: "seller" });
        await newUser.save();

        // Generate token for client
        const payload = {
            id: newUser._id,
            email: email
        }

        const token = jwt.sign(payload, SECRET);
        return res.status(200).json({ success: true, msg: 'Seller Account successfully created', token: token });
    }
    catch (err) {
        console.log(":: Error in Seller Signup (seller.ts) ::\n", err);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
})

// /login -> For user login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, passwd }: loginParam = req.body;

        if (!email || !passwd) {
            return res.status(404).json({ success: false, msg: "Some fields are empty" })
        }
        const user = await SellerModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, valid: false, msg: "Seller not found!" })
        }

        const passwdMatch = await bcrypt.compare(passwd, user.passwd);
        if (!passwdMatch) {
            return res.status(401).json({ success: false, msg: "Incorrect password!" });
        }
        const payload = {
            id: user._id,
            email: email
        }
        const token = jwt.sign(payload, SECRET);

        return res.status(200).json({ success: true, token: token, msg: "Successfully logged in!" })
    } catch (error) {
        console.log(":: /seller/login(seller.ts) ::\n", error);
        return res.status(200).json({ success: false, msg: "Internal server error" })
    }
})

// Validating user with token
router.post('/validate', validateSeller, (req: RequestWithUser, res) => {
    res.status(200).json({ user: req.user });
})

export default router