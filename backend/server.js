const connectDB = require("./config/db")
const dotenv = require('dotenv');
const express = require('express');

dotenv.config(); 
const app = express(); 


connectDB();


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));