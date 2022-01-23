const Transaction = require('../DAO/Transaction');
const Card = require('../DAO/Card');
class TransactionController{
    async getAll(req, res, next){
        const transactions = await Transaction.find({});
        return res.status(200).json(transactions);
    }

    async makeTransaction(req, res, next){
        try{
            const { amount, srcAccount, destAccount, user } = req.body;
            const { type } = req.query;
            //if (!['withdraw', 'deposit', 'transfer'].find(type)) return res.json({ message: 'Invalid type' })
            const card = await Card.findById(srcAccount);
            if (card != null){
                const transaction = new Transaction({
                    type: type.toLowerCase(),
                    amount,
                    srcAccount,
                    destAccount,
                    user,
                    fee: 0
                })
                if (type.toLowerCase() === 'withdraw'){
                    if (amount + fee <= card.balance){
                        const fee = transaction.calFee(amount);
                        card.blance -= amount + fee;
                        transaction.status = '200';
                        transaction.fee = fee;
                        await card.save();
                    }else{
                        transaction.status = '000';
                    }
                    await transaction.save();
                }
                return res.json(transaction);
            }
        }catch(err){
            next(err);
        }
    }
}
module.exports = new TransactionController();