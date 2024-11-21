import mongoose, { Schema, model } from "mongoose";


const bankSchema = Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})


export const Account = model('Account', bankSchema)