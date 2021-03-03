const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const videoSchema = mongoose.Schema({
    writer : {
        type: Schema.Types.ObjectId,
        ref: 'User'//이렇게 하면 User모델에서 전부 불러올 수 있다.
    },
    title : {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    privacy: {
        type: Number,
    },
    filePath: {
        type: String,
    },
    category: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String,
    },
    thumbnail: {
        type: String,
    }
},{timestamp: true})
const Video = mongoose.model('Video', userSchema);

module.exports = { User }