const mongoose = require('mongoose')



const connectDB = () => {
    try {
        mongoose.connect(process.env.DB_URI);
        const conn = mongoose.connection.once(() => {
            console.log('connected to db')
        })
    } catch(err) {
        console.error(err.message);
    }
}

const db = mongoose.connection.db;

export { connectDB, db }