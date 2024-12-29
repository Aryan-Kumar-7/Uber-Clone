import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captionSchema = new mongoose.Schema({
    fullName: {
        firstName: { type: String, required: true },
        lastName: { type: String}
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    soketId: {
        type: String
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle: {
        color:{type: String, required: true},
        plate: {type: String, required: true},
        capacity: {type: Number, required: true},
        vehicleType: {type: String, required: true, enum: ['car', 'bike', 'auto']},
    },

    location: {
        lag: {type: Number},
        lat: {type: Number}
    },

}, {timestamps: true});

captionSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

captionSchema.methods.passwordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

captionSchema.methods.genrateAuthToken = function() {
    const token = jwt.sign(
        {
            _id: this._id
        },
        process.env.AUTH_TOKEN_SECRET,
        {
            expiresIn: '10d'
        }
    )
    return token;
}

export const Caption = mongoose.model('Caption', captionSchema);