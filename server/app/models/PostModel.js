import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    slug: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

export const PostModel = mongoose.model('posts', PostSchema)
