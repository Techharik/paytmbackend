import { Schema, model } from "mongoose";


const bankSchema = Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    balance: Number
})

export const Account = model('Account', bankSchema)