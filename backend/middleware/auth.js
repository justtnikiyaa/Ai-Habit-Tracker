import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
}; 

export const protectAI = async (req, res, next) => {
    if(process.env.GEMINI_API_KEY) {
        next();
    } else {
        res.status(503);
        throw new Error("AI services not available. Please set GEMINI_API_KEY in your .env file.");
    }
}