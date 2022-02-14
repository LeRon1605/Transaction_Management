const Transaction = require('../DAO/Transaction');
const Card = require('../DAO/Card');
class TransactionController{
    // [GET] /
    async getAll(req, res, next){
        const transactions = await Transaction.find({});
        return res.status(200).json(transactions);
    }

    // [POST] /
    async makeTransaction(req, res, next){
        try{
            const { amount, srcAccount, destAccount } = req.body;
            const { type } = req.query;
            if (type.toLowerCase() != 'withdraw' && type.toLowerCase() != 'deposit' && type.toLowerCase() != 'transfer') return res.json({ message: 'Invalid type' })
            const card = await Card.findById(srcAccount);
            if (card != null){
                const transaction = new Transaction({
                    type: type.toLowerCase(),
                    amount,
                    srcAccount,
                    destAccount,
                    user: card.owner,
                    fee: 0
                })
                if (type.toLowerCase() === 'withdraw'){
                    if (amount > 50000){
                        const fee = transaction.calFee(amount);
                        if (amount + fee <= card.balance){
                            card.balance -= (amount + fee);
                            transaction.statusCode = '200';
                            transaction.fee = fee;
                            await card.save();
                        }else{
                            transaction.statusCode = '000';
                        }
                    }else transaction.statusCode = '100'
                }else if (type.toLowerCase() == 'deposit'){
                    if (amount > 50000){
                        const fee = transaction.calFee(amount);
                        card.balance += amount - fee;
                        transaction.statusCode = '200';
                        transaction.fee = fee;
                        await card.save();
                    }else transaction.statusCode = '100';
                }else if (type.toLowerCase() == 'transfer'){
                    const destCard = await Card.findById(destAccount);
                    if (destCard){
                        if (amount > 50000){
                            const fee = transaction.calFee(amount);
                            if (card.balance >= amount + fee){
                                card.balance -= amount + fee;
                                destCard.balance += amount;
                                transaction.fee = fee;
                                transaction.statusCode = '200';
                                await card.save();
                                await destCard.save();
                            }else transaction.statusCode = '000';
                        }else transaction.statusCode = '100';
                    }else return res.json({ message: 'Destination card not found' });
                }
                transaction.description = transaction.getStatus(transaction.statusCode);
                card.transaction.push(transaction._id);
                await card.save();
                await transaction.save();
                return res.json(transaction);
            }else return res.json({ message: 'Source Card not found' });
        }catch(err){
            next(err);
        }
    }

    // [DELETE] /
    async deleteAll(req, res, next){
        await Transaction.remove({});
        return res.json({ message: 'Deleted'});
    }

    // [GET] /:id
    async getTransaction(req, res, next){
        const transaction = await Transaction.findById(req.params.id);
        if (transaction) return res.status(200).json(transaction);
        else return res.json({ message: 'Transaction not found' });
    }

    // [DELETE] /:id
    async deleteTransaction(req, res, next){
        try{
            const transaction = await Transaction.findById(req.params.id);
            if (transaction) {
                await transaction.remove();
                return res.json({ message: 'Transaction deleted successfully' });
            }else return res.json({ message: 'Transaction not found' });
        }catch(err){
            next(err);
        }
    }




}
module.exports = new TransactionController();