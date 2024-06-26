import Studio from "../models/studio.model.js"
import AppError from "../utils/error.util.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const getAllStudios = async function (req, res, next) {
    try {
        const studios = await Studio.find({}).select('')

        res.status(200).json({
            success: true,
            message: 'All Studios',
            studios,
        })
    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

const createStudio = async (req, res, next) => {
    try {
        let { title, location, price, createdBy, description,specialities, services, languages, mobileNumber, albums, packages, packagesOptional} = req.body;

        if (!title || !location || !price || !createdBy ||!mobileNumber) {
            return next(new AppError('All fields are required', 400))
        }

        const userExists = await Studio.findOne({ mobileNumber });

        if (userExists) {
            return next(new AppError('Your studio is already exists', 400))
        }

        let studio = await Studio.create({
            title,
            location,
            price,
            createdBy,
            description,
            specialities,
            services,
            languages,
            packages,
            mobileNumber,
            albums,
            packagesOptional,
            images: [],
            thumbnail: {
                public_id: 'Dummy',
                secure_url: 'Dummy'
            }
        });

        if (!studio) {
            return next(new AppError('Studio could not be created, please try again', 500))
        }

        let uploadedImages = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                try {
                    const result = await cloudinary.v2.uploader.upload(file.path, {
                        folder: 'lms'
                    });

                    if (result) {
                        uploadedImages.push({
                            public_id: result.public_id,
                            secure_url: result.secure_url
                        });
                    }

                    fs.rm(file.path);
                } catch (error) {
                    return next(new AppError(error.message, 500));
                }
            }
        }

        studio.images = uploadedImages;

        await studio.save();

        res.status(200).json({
            success: true,
            message: 'Studio created successfully',
            studio
        });

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}


const updateStudio = async (req, res, next) => {

    try {

        const { id } = req.params;
        const { title, specialities, services, description, price, albums, packages } = req.body;
        const studio = await Studio.findById(id)

        if (!studio) {
            return next(
                new AppError('Studio with given id does not exist', 500)
            )
        }

        if (title) {
            studio.title = title;
        }

        if(specialities){
            studio.specialities = specialities;
        }

        if(services){
            studio.services = services;
        }

        if(description){
            studio.description = description;
        }

        if(price){
            studio.price = price;
        }

        if(albums){
            studio.albums = albums;
        }

        if(packages){
            studio.packages = packages;
        }

        res.status(200).json({
            success: true,
            message: 'Studio updated successfully!',
            studio
        })

    } catch (error) {
        return next(
            new AppError(error.message, 500)
        )
    }
}

const removeStudio = async (req, res, next) => {
    try {

        const { id } = req.params;
        const studio = await Studio.findById(id)

        if (!studio) {
            return next(
                new AppError('Studio with given id does not exist', 500)
            )
        }

        await Studio.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Studio deleted successfully'
        })

    } catch (error) {
        return next(
            new AppError(error.message, 500)
        )
    }
}


// TODO: deletelecture

export {
    getAllStudios,
    createStudio,
    updateStudio,
    removeStudio,
}