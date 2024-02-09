import Express, { Request, Response } from "express"

import { ProductModel } from "../db";
import { validateSeller } from "../middleware/authware"
import { sellerDocType, productType } from '../types/types';

const router = Express();

interface RequestWithUser extends Request { user: sellerDocType }

// Fetching all products from the db
router.get("/", async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find({});
        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(":: Error in fetching products / (product.ts)", error);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
})

// Returning a product list based on the keywords recv from req
router.post("/list", async (req: Request, res: Response) => {
    const { keywords } = req.body;
    if (!keywords) {
        return res.status(404).json({ success: false, msg: 'Keywords missing!' });
    }

    try {
        const products = await ProductModel.find({
            keywords: { $in: keywords }
        })
        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(":: Error in fetching products list /list / (product.ts)", error);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
})

// Uploading product image
// router.post("/image", validateSeller, (req: RequestWithUser, res) => {})

// Creating a new product
router.post('/create', validateSeller, async (req: RequestWithUser, res) => {
    try {
        const { name, desc, price, image, arLink, keywords } = req.body;
        if (!name || !desc || !price || !keywords) {
            return res.status(400).json({ success: false, msg: 'All fields not provided' });
        }
        const newProduct = await ProductModel.create({ name, desc, image, price, arLink, keywords })
        await newProduct.save();
        return res.status(200).json({ success: true, msg: 'Product successfully created', product: newProduct });
    } catch (error) {
        console.log(":: Error in creating product /create (product.ts) ::", error);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
})

export default router;