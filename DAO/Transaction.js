const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    date: {
        default: Date.now(),
        type: Date
    },
    amount: {
        type: Number,
        required: true
    },
    srcAccount: {
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    },
    destAccount: {
        type: Schema.Types.ObjectId,
        ref: 'Card'
    },
    type: {
        type: String,
        enum: ['withdraw', 'deposit', 'transfer'],
        required: true
    },
    fee: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        required: true
    },
    statusCode: {
        type: String,
        enum: ['000', '100', '200'],
        default: '000'
    },
    description: {
        type: String,
        default: ''
    }
});

TransactionSchema.methods.getStatus = (statusCode) => {
    if (statusCode == '000') return 'Balance does not enough to make this transaction';
    else if (statusCode == '100') return 'Amount is less than 50,000';
    else if (statusCode == '200') return 'Success';
}

TransactionSchema.methods.calFee = (amount) => {
    return 0.05*amount;
}

module.exports = mongoose.model('Transaction', TransactionSchema);