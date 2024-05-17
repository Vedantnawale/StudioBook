import { model, Schema } from "mongoose";

const Studioschema = new Schema({
    thumbnail: {
        public_id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [8, 'Title must be at least 8 characters'],
        maxLength: [59, 'Title should be less than 60 characters'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        maxLength: [49, 'Location should be less than 50']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    description: [{
        type: String,
        required: true
    }],

    specialities: [{
        type: String,
        required: true,
    }],

    services: [{
        type: String,
        required: true,
    }],

    languages: [{
        type: String,
        required: true,
    }],

    albums: [{
        type: String,
        required: true,
    }],

    packages: [{
        type: String,
        required: true,
    }],

    packagesOptional: [{
        type: String,
        required: true,
    }],

    mobileNumber: {
        type: Number,
        required: [true, 'mobiile number is required'],
        maxLength: [10, 'Location should be less than 50']
    },
    images: [
        {
            public_id: {
                type: String,
            },
            secure_url: {
                type: String,
            }
        }
    ],
    createdBy: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Studio = model('Studio', Studioschema);

export default Studio;
