import express from "express";
import { create, deleteData, getAll, getoneData, updateData} from "../controller/user-controller.js";
import {userLogin} from "../controller/userLogin.js"
import { authencateJWT } from "./middleware/authMiddleware.js";
const route =express.Router();

route.post("/checkUser",userLogin)
route.post("/create",create)
route.get("/getdata",authencateJWT,getAll)
route.get("/getone/:id",authencateJWT,getoneData)
route.put("/update/:id",authencateJWT,updateData)
route.delete("/delete/:id",authencateJWT,deleteData)
export default route;