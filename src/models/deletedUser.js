const mongoose = require('mongoose')

const deletedUserSchema = new mongoose.Schema({
    username: String,
    email: String,
    creationDate: {type: Date},
    deletionDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('DeletedUser', deletedUserSchema)