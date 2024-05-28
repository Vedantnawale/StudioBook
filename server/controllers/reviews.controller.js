import Review from "../models/reviews.model.js";
import AppError from "../utils/error.util.js"

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        return next(new AppError(error.message, 500))
    }
};

export const createReview = async (req, res, next) => {
    const { rating, feedback } = req.body;

    try {
        const newReview = new Review({ rating, feedback });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        return next(new AppError(error.message, 500))
    }
};

export const updateReview = async (req, res, next) => {
    const { id } = req.params;
    const { rating, feedback } = req.body;

    try {
        const updatedReview = await Review.findByIdAndUpdate(id, { rating, feedback }, { new: true });
        if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json(updatedReview);
    } catch (error) {
        return next(new AppError(error.message, 500))
    }
};

export const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
