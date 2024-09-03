import jwt from "jsonwebtoken";
export const authencateJWT = async (req, res, next) => {
    let KEY = process.env.JWT_SECRET;
    let token = req.header("Authorization")?.replace("Bearer", "").trim();
    // console.log(token)
    if (!token) {
        return res.status(403).json({ msg: "Access denied." });
    }
    try {
        const decode = jwt.verify(token, KEY);
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid token." });
    }
}