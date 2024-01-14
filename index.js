import express  from "express";
import morgan from "morgan";
import router from "./Routes/Index.js";
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "mongoose";

const app = express();

dotenv.config()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.get("/" , function(req , res){
    res.send("Welcome to backend seve")
})

app.use("/api/v1" , router);

mongoose.connect(process.env.MONGOURL).then(() => console.log('Database connected'))
app.listen(8000 , () => console.log("App is running on port 8000"))