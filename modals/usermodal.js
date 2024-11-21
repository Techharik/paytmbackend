import { Schema, model } from "mongoose";

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    password: {
        type: String,
        select: false
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
})

export const userModal = model("user", userSchema)