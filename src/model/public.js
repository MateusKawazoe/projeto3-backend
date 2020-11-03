const { Schema, model } = require('mongoose')

const publicSchema = new Schema({
    photo: type = String,
    owner: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    data: {
        type: String,
        required: true
    }, 
}, {
    timestamps: true
})

module.exports = model('public',publicSchema)