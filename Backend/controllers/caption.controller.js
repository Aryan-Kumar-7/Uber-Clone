import { validationResult } from "express-validator";
import { Caption } from "../models/caption.model.js";


const registerCaption = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { firstName, lastName, email, password, color, plate, capacity, vehicleType } = req.body;

    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType){
        return res.status(400).json({message: 'Please enter all fields'});
    }

    const captionExists = await Caption.findOne({email});
    if(captionExists){
        return res.status(400).json({message: 'Caption already exists'});
    }

    const hashedPassword = await Caption.hashPassword(password);

    const caption = await Caption.create({
        fullName: {firstName, lastName},
        email,
        password: hashedPassword,
        vehicle: {color, plate, capacity, vehicleType}
    })

    const token = caption.genrateAuthToken();

    return res.status(201).json({token, caption});
}

const captionLogin = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body; 
    if(!email || !password){
        return res.status(400).json({message: 'Please enter all fields'});
    }

    const caption = await Caption.findOne({email}).select('+password');
    if(!caption){
        return res.status(400).json({message: 'Caption not found'});
    }

    const passwordCorrect = await caption.passwordCorrect(password);
    if(!passwordCorrect){
        return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = caption.genrateAuthToken();

    res.cookie('token', token);

    return res.status(200).json({token, caption});
}

const getCaption = async (req, res) => {
    return res.status(200).json({caption: req.caption});
}

const logoutCaption = async (req, res) => {
    // Clear the 'token' cookie
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
};

export { registerCaption, captionLogin, getCaption, logoutCaption };