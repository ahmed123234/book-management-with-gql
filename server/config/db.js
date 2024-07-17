const mongoose  = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect(process.env.URI);
        mongoose.connection.once('open', () => {
                console.log("connecting database on port", mongoose.connection.port);
        })

    } catch(err) {
        console.error(err.message);
    }
}


module.exports = { connectDB }