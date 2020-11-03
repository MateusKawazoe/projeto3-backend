const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    foto: {
        url: type = String,
        _id: type = String
    },
    usuario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    admin: type = Number
}, {
    timestamps: true
})

module.exports = model('user',userSchema)