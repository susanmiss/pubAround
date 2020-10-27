const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required',
        minlength: 4,
        maxlength: 40,
        unique: true
    },
    body: {
        type: {},
        required: 'Body is required',
        minlength: 4,
        maxlength: 2000
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    user: {
        type: String,
        defautl: 'Admin'
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema)