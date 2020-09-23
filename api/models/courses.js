const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required:true},
    provider: { type: String, required:true},
    rating: { type: String, required:true},
    enroll: { type: String, required:true},
    tag: { type: String, required:true}
});


module.exports = mongoose.model('Course', courseSchema);