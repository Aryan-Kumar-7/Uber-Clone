import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Caption } from "../models/caption.model.js";

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized Token' });
        }

        const decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized User' });
        }

        req.user = user;

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized Error' });
    }
}

export const authCaption = async (req, res, next) => {
    try {

        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized Token' });
        }


        const decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
        const caption = await Caption.findById(decoded._id);

        if (!caption) {
            return res.status(401).json({ message: 'Unauthorized Caption' });
        }

        req.caption = caption;

        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized Error' });
    }
}