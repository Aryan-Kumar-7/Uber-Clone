import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
        }
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    soketId: {
        type: String
    },
}, {timestamps: true});

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.passwordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.genrateAuthToken = function() {
    const token =  jwt.sign(
        {
            _id: this._id,
        },
        process.env.AUTH_TOKEN_SECRET,
        {
            expiresIn: '10d'
        }
    )
    return token;
}

export const User = mongoose.model('User', userSchema);