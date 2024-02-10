import "dotenv/config"
import Express, { Request, Response } from "express"
import { UploadApiOptions, v2 as cloudinary } from "cloudinary";
import { ProductModel, SellerModel } from "../db";
import { validateSeller } from "../middleware/authware"
import { sellerDocType, productType } from "../types/types";

const router = Express();

interface RequestWithUser extends Request { user: sellerDocType }

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Fetching all products from the db
router.get("/", async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find({});
        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(":: Error in fetching products / (product.ts)", error);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
})

// Fetching product detail for that id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        return res.status(200).json({ success: true, product });
    } catch (error) {
        console.log(":: Error in fetching products / (product.ts)", error);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
})

// Returning a product list based on the keywords recv from req
router.post("/list", async (req: Request, res: Response) => {
    const { keywords } = req.body;
    if (!keywords) {
        return res.status(404).json({ success: false, msg: "Keywords missing!" });
    }

    try {
        const products = await ProductModel.find({
            keywords: { $in: keywords }
        })
        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(":: Error in fetching products list /list / (product.ts)", error);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
})

// Uploading product image
router.post("/image", validateSeller, (req: Request, res) => {
    const { image } = req.body;
    const opts: UploadApiOptions = {
        overwrite: true,
        invalidate: true,
        resource_type: "auto",
    };

    try {
        cloudinary.uploader.upload(image, opts, async (error, result) => {
            if (result && result.secure_url) {
                return res.status(200).json({ imageUrl: result.secure_url });
            }
            else {
                console.log(":: Error in uploading image /image (product.ts) ::", error);
                return res.status(500).json({ msg: "Error in uploading image", error });
            }
        });
    } catch (error) {
        console.log(":: Error in uploading image /image (product.ts) ::", error);
        return res.status(500).json({ msg: "Error in uploading image", error });
    }
})

// Creating a new product
router.post("/create", validateSeller, async (req: RequestWithUser, res) => {
    try {
        const { name, desc, price, image, arLink, keywords } = req.body;
        if (!name || !desc || !price || !keywords) {
            return res.status(400).json({ success: false, msg: "All fields not provided" });
        }
        const newProduct = await ProductModel.create({ name, desc, image, price, arLink, keywords })
        await newProduct.save();
        const updated = await SellerModel.findByIdAndUpdate(req.user._id, { $push: { products: newProduct } })
        if (!updated) {
            return res.status(404).json({ success: false, msg: "Seller not found!" });
        }
        return res.status(200).json({ success: true, msg: "Product successfully created", product: newProduct });
    } catch (error) {
        console.log(":: Error in creating product /create (product.ts) ::", error);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
})

export default router;