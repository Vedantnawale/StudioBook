import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be at least 5 Character'],
        maxLength: [50, 'Name should be less than 50 character'],
        lowercase: true, // name db mein hamesha lowercase mein store ho
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password length must be a 8 characters'],
        select: false // agar user se related information mang raha hu to mujhe mat dena
    },
    avatar: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },

    phoneNumber: {
        type: Number,
        required: [true, 'Moblie Number is required'],
        unique: true,
    },


    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,

    subscription: {
        id: String,
        status: String
    }

}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods = {
    genrateJWTToken: async function () {
        return await jwt.sign(
            {
                id: this._id,
                email: this._email,
                subscription: this.subscription,
                role: this.role
            }, process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        )
    },
    comparePassword: async function(plainPassword) {
        return await bcrypt.compare(plainPassword, this.password)
    },

    genratePasswordResetToken: async function () {
        const resetToken = crypto.randomBytes(20).toString('hex');
        this.forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000 // 15min from now

        return resetToken;
    },
}

const User = model('User', userSchema)

export default User;