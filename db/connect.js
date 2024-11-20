import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const connection = await mongoose.connect('mongodb+srv://khariprasath30:E3RelwssNnzbmlDP@cluster0.b8ohb.mongodb.net/test')
        console.log(connection.nextConnectionId)
    } catch (e) {
        console.log('connection failed' + e)
    }
}