import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ✅ Body parser
app.use(express.json());


import authroutes from "./routes/authRoutes.js";
app.use("/api/auth", authroutes);


const port = process.env.PORT || 5000;



mongoose.connect(process.env.MONGO_URI)
.then( ()=> {
    console.log("✅ Mongo connected sucssesfully");
    app.listen(port, () => {
        console.log(`✅ Server running on port ${port}`); 
    });
}
)
.catch((err) => console.error("Mongo connection error  : ", err));

