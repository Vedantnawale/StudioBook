import { model, Schema } from "mongoose";

const reviewSchema = new Schema({
    rating: { type: Number, required: true },
    feedback: { type: String, required: true },
    fullName: {type: String},
    profile: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    }
}, {
    timestamps: true
});

const Review = model('Review', reviewSchema);

export default Review;
