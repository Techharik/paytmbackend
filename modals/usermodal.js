import { Schema, model } from "mongoose";

const userSchema = Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
})

export const userModal = model("user", userSchema)