
import { validationResult } from "express-validator"
import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { firstName, lastName, email, password } = req.body;
    if(!firstName || !email || !password) {
        return res.status(400).json({message: 'Please enter all fields'});
    }

    const userExists = await User.findOne({email});
    if(userExists) {
        return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
        fullName: {firstName, lastName},
        email,
        password: hashedPassword
    })

    const token = user.genrateAuthToken();

    return res.status(201).json({token, user});
}

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({message: 'Please enter all fields'});
    }

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(400).json({message: "User not found"});
    }

    const passwordCorrect = await user.passwordCorrect(password);
    if(!passwordCorrect) {
        return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = await user.genrateAuthToken();

    res.cookie('token', token);

    return res.status(200).json({token, user});

}

const logoutUser = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
}

const getUser = async (req, res) => {    
    return res.status(200).json(req.user);
}

export { registerUser, loginUser, logoutUser, getUser };