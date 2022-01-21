const Transaction = require('../DAO/Transaction');
const Card = require('../DAO/Card');
class TransactionController{
    async getAll(req, res, next){
        const transactions = await Transaction.find({});
        return res.status(200).json(transactions);
    }

    async makeTransaction(req, res, next){
        const { type, amount, srcAccount, destAccount, user } = req.body;
        const card = await Card.findById(srcAccount);
        if (card != null){
            if (type.toLowerCase() === 'withdraw'){
                if (card.balance >= amount){
                    
                }
                console.log(transaction);
            }
        }
    }
}
module.exports = new TransactionController();