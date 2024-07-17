const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: Schema.Types.String
    },
    description: {
        type: String,
    },
    genre: {
        type: String
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    }

});


const BookModel = mongoose.model('book', BookSchema);

module.exports= {BookModel};