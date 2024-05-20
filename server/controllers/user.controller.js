import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary"
import fs from 'fs/promises'
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days,
    httpOnly: true,
    secure: true
}

const register = async (req, res, next) => {
    const { fullName, mobileNumber, email, password, role } = req.body;

    if (!fullName || !email || !password || !mobileNumber) {
        return next(new AppError('All fields are required', 400)); // isko capture karo or aage bhej do
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return next(new AppError('Email is already exists', 400))
    }

    const user = await User.create({
        fullName,
        email,
        password,
        mobileNumber,
        role,
        avatar: {
            public_id: email,
            secure_url: 'http://www.example.com/' // dummy url 
        }

    })

    if (!user) {
        return next(new AppError('User registration failed, please try again', 400));
    }

    //TODO: File Upload

    // yaha pe converted file mil jayegi ab yaha se cloudinary pe upload karna padta hai.
    // console.log('File Details : ', JSON.stringify(req.file.path));
    if (req.file) {
        console.log(req.file);
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                gravity: 'faces', // focus kaha pe karna hai,
                crop: 'fill' //
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url; // cloudinary ka secure_url

                // Remove file from server
                fs.rm(`uploads/${req.file.filename}`)
            }

        } catch (error) {
            return next(
                new AppError(error || 'file not uploaded, please try again', 400)
            )
        }
    }

    await user.save();

    user.password = undefined;

    const token = await user.generateJWTToken();

    res.cookie('token', token, cookieOptions);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
    })

}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('All Fields are required', 400));
        }

        const user = await User.findOne({
            email
        }).select('+password')  // kyuki password select false hai

        // If no user or sent password do not match then send generic response
        if (!(user && (await user.comparePassword(password)))) {
            return next(
                new AppError('Email or Password do not match or user does not exist', 401)
            );
        }


        const token = await user.generateJWTToken();
        user.password = undefined;

        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'User loggedin successfully!',
            user
        })
        console.log(user);
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const logout = (req, res) => {
    try {
        res.cookie('token', null, {
            secure: true,
            maxAge: 0,
            httpOnly: true
        });

        res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        })
    } catch (error) {
        return next(new AppError(error.message, 500));
    }

}

const getProfile = async (req, res, next) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId)

        res.status(200).json({
            status: true,
            message: 'User Details',
            user
        })
    } catch (error) {

        return next(new AppError('Failed to fetch profile details', 500))
    }

}

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new AppError('Email is required', 400));
    }

    const user = await User.findOne({ email })
    if (!user) {
        return next(new AppError('Email not registered', 400))
    }

    const resetToken = await user.genratePasswordResetToken();

    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;


    const subject = 'Reset Password'
    const message = `You can reset your password by clicking <a href=${resetPasswordURL} targe="_blank">Reset your password</a>\n If the above link does not work some reason then copy paste this link in new tab ${resetPasswordURL}.\n If you have not requested this, kindly ignore.`
    try {
        await sendEmail(email, subject, message)

        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} succesfully`
        })
    } catch (error) {

        // agar kuch reason se user ko token nahi bhej paya
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;

        await user.save();
        return next(new AppError(e.message, 500))
    }

}

const resetPassword = async (req, res, next) => {
    const { resetToken } = req.params

    const { password } = req.body

    const forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() } // jo token uska expiry abhi se greater hai wo future mein hai ya nahi.   
    })

    if (!user) {
        return next(new AppError('Token is invalid or expires, please try again', 400))
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    user.save()

    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    })
}

const changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user

    if (!oldPassword || !newPassword) {
        return next(
            new AppError('all fields are mandatory', 400)
        )
    }

    const user = await User.findById(id).select('+password')

    if (!user) {
        return next(
            new AppError('User does not exist', 400)
        )
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if (!isPasswordValid) {
        return next(new AppError('Invalid old password', 400))
    }

    user.password = newPassword;

    await user.save();

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    })
}

const updateUser = async (req, res, next) => {
    const { fullName } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return next(
            new AppError('User does not exist', 400)
        )
    }

    if (fullName) {
        user.fullName = fullName;
    }

    if (req.file) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                gravity: 'faces', // focus kaha pe karna hai,
                crop: 'fill' //
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url; // cloudinary ka secure_url

                // Remove file from server
                fs.rm(`uploads/${req.file.filename}`)
            }

        } catch (error) {
            return next(
                new AppError(error || 'file not uploaded, please try again', 400)
            )
        }
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: 'User details updated successfully!'
    })

}

export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
}