import express from "express";
import { create, deleteData, getAll, getoneData, updateData } from "../controller/user-controller.js";
const route =express.Router();
route.post("/create",create)
route.get("/getdata",getAll)
route.get("/getone/:id",getoneData)
route.put("/update/:id",updateData)
route.delete("/delete/:id",deleteData)
export default route;