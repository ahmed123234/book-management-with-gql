const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookRef = new Schema({
   
});

const AuthorSchema = new Schema({
    name: {
        type: Schema.Types.String
    },
    age: {
        type: Number
    },
    bookIds:
         [{
            type: ObjectId,
            ref: 'Book'
        }]

});




const AuthorModel = mongoose.model('author', AuthorSchema);

module.exports= {AuthorModel};