import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    email: String,
    passwordResetToken: String,
    passwordResetExpired:Date,
})

export const UserModel = mongoose.model('users', UserSchema)
