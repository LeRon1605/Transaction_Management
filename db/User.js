const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    },
    role: {
        type: String, 
        enum: ['admin', 'user'],
        default: 'user'
    },
    card: [
        {
            type: Schema.Types.ObjectId,
			ref: 'Card',
            default: null
        }
    ]
})

module.exports = mongoose.model('User', userSchema);