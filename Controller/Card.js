const Card = require('../DAO/Card');
const User = require('../DAO/User');
const bcrypt = require('bcryptjs');
class CardController
{   
    // [GET] /
    async getAll(req, res, next) {
        const cards = await Card.find({});
        return res.status(200).json(cards);
    }

    // [POST] /
    async createCard(req, res, next) {
        try{
            const { balance, pin, ownerID } = req.body;
            const owner = await User.findById(ownerID);
            if (owner) {
                const newCard = new Card({
                    balance,
                    pin,
                    owner: owner._id
                })
                await newCard.save();
                owner.card.push(newCard._id);
                await owner.save();
                return res.status(200).json(newCard);
            }else return res.json({message: 'Owner not found'});
        }catch(err){
            next(err);
        }
    }
    // [DELETE] / 
    async deleteAll(req, res, next){
        try{
            await Card.remove({});
            const users = await User.find({});
            for (let i = 0; i < users.length; i++){
                users[i].card = [];
                await users[i].save();
            } 
            return res.status(200).json({ message: 'Deleted'});
        }catch(err){
            next(err);
        }
    } 

    // [GET] /:id
    async getCard(req, res, next){
        try{
            const card = await Card.findById(req.params.id);
            if (card){
                return res.status(200).json(card);
            }else{
                return res.status(404).json({ message: 'Card not found' });
            }
        }catch(err){
            next(err);
        }
    }
    // [PUT] /:id
    async updateCard(req, res, next){
        try{
            const { balance, pin } = req.body;
            const card = await Card.findById(req.params.id);
            const obj = {
                balance,
                updatedAt: Date.now()
            };
            if (card){
                if (pin != null){
                    obj.pin = bcrypt.hashSync(pin, 8);;
                    obj.pinUpdatedAt = Date.now();
                }
                const result = await card.update(obj);
                return res.status(200).json(await Card.findById(req.params.id));
            }else return res.status(204).json({ message: 'Card not found' });
        }catch(err){
            next(err);
        }
    }
    // [DELETE] /:id
    async deleteCard(req, res, next) {
        try {
            const card = await Card.findById(req.params.id);
            if (card){
                const user = await User.findById(card.owner);
                user.card = user.card.filter((e) => (e != req.params.id));
                await user.save();
                await card.remove();
                return res.status(200).json({ message: 'Deleted successfully' });
            }else return res.status(404).json({ message: 'Card not found' });
        }catch(err){
            next(err);
        }
    }

    // [GET] /:id/owner
    async getOwner(req, res, next){
        try{
            const card = await Card.findById(req.params.id).populate('owner');
            return res.status(200).json(card.owner);
        }catch(err){
            next(err);
        }
    }
    
}
module.exports = new CardController();