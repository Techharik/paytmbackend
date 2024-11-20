import { Schema, model } from "mongoose";

const userSchema = Schema({
    username: String,
    password: {
        type: String,
        select: false
    },
    firstname: String,
    lastname: String,
})

export const userModal = model("user", userSchema)