import Express from "express";
import cors from "cors"
import mongoose from "mongoose";

import { authRouter } from "./routes"
import connectDB from "./db";

const app = Express() ;
app.use(cors()) ;
app.use(Express.json({limit: '50mb'})) ;

// Using routes
app.use("/auth",authRouter) ;

// :::: Important Settings :::::
const port = 8000;
connectDB();


app.get("/",(req,res)=> {
    res.send("Hemlo") ;
})

app.post("/auth/signup",(req,res)=> {
    console.log("here") ;
    res.status(200).json({msg: "Hello from the Backend"}) ;
});

app.listen(port,() => {
    console.log("Server running") ;
});