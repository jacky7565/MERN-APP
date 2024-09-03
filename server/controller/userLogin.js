import jwt from "jsonwebtoken";
import User from "../model/user_model.js";

export const userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;
        const userVal = await User.findOne({ email });
        //   console.log(userVal)
        if (!userVal) {
            return res.status(401).json({ msg: "Invalid User Or Password" })
        }
        if (userVal.password !== password) {
            return res.status(401).json({ msg: "Invalid User Or Password" })
        }

        const payLoad = {
            userId: userVal._id,
            email: userVal.email
        }

        const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({token:token,msg:"Login Successful" })


    }
    catch (eror) {
        res.status(400).json({ msg: eror.message })
    }
}