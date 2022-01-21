const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const cardSchema = new Schema({
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    pin: {
        type: String,
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
    pinUpdatedAt: {
        type: Date,
        default: null
    },
    owner: {
        type: Schema.Types.ObjectId,
		ref: 'User',
        required: true
    }
});
cardSchema.pre('save', async function (next){
	try{
		const hash = bcrypt.hashSync(this.pin, 8);
        this.pin = hash;
	}catch(err){
		next(err);
	}
})
module.exports = mongoose.model('Card', cardSchema);