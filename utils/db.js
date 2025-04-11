import mongoose from "mongoose"

// Функция для коннекта с mongodb

export default async function db() {
    if (mongoose.connections.readyState >= 1) {
        return
    }

    try {
        await mongoose.connect(process.env.DB)
        console.log("Connection to Database")
    } catch(err) {
        console.log(err)
        console.log("Failed to connect DB")
    }
}

