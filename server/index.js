import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRouts.js";
const app =express();
app.use(bodyParser.json())
app.use(cors());
dotenv.config();


const PORT=process.env.PORT ||8000;
const URl=process.env.MONGOURL;
mongoose.connect(URl).then(()=>{
console.log("Db Connected Successfull")
app.listen(PORT,()=>{
    console.log("Server on Running on Port No : "+ PORT)
})

}).catch(error=>console.log(error))

 app.use("/api",route)

