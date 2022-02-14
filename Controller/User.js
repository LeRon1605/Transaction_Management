const User = require('../db/User');
const Card = require('../db/Card');
const jwt = require('jsonwebtoken');
class UserController
{ 
    // [GET] /
    async getAllUsers(req, res, next) {
        try{
            const users = await User.find({});
            return res.status(200).json(users);
        }catch(err){
            next(err);
        }
    }
    // [POST] /
    async createUser(req, res, next) {
        try{
            const { username, password, name, gender, address, birth } = req.body;
            const user = await User.findOne({ username });
            if (user) return res.json({ 
                message: `username ${username} is already existed`
            })
            const newUser = new User({
                username,
                password,
                name,
                gender,
                address,
                birth: new Date(birth)
            })
            await newUser.save();
            return res.status(200).json(newUser);
        }catch(err){
            next(err);
        }
    }
    // [DELETE] /
    async removeAll(req, res, next){
        try{
            await User.remove({});
            return res.status(200).json({
                message: 'Deleted'
            })
        }catch(err){    
            next(err);
        }
    }

    // [GET] /:id
    async getUser(req, res, next){
        try{
            const user = await User.findById(req.params.id);
            if (user) return res.status(200).json(user);
            else return res.status(200).json({
                message: 'User not found'
            })
        }catch(err){
            next(err);
        }
    }
    // [PUT] /:id
    async updateUser(req, res, next){
        try{
            const user = {
                name: req.body.name,
                gender: req.body.gender,
                address: req.body.address,
                birth: new Date(req.body.birth) || null,
                updatedAt: new Date()
            }
            const result = await User.findByIdAndUpdate(req.params.id, user);
            if (!result) return res.status(404).json({ message: 'User not found' })
            const updatedUser = await User.findById(req.params.id); 
            return res.status(200).json(updatedUser);
        }catch(err){
            next(err);
        }
    }
    // [DELETE] /:id
    async deleteUser(req, res, next){
        try{
            const user = await User.findById(req.params.id).populate('card');
            for (let i = 0; i < user.card.length; i++) {
                await user.card[i].remove();
            }
            await user.remove();
            if (user) return res.status(200).json({
                                    message: 'User deleted'
                                })
            else return res.status(404).json({
                message: 'User not found'
            })
        }catch(err){
            next(err);
        }
    }

    // [GET] /:id/card
    async getUserCards(req, res, next) {
        try{
            const user = await User.findById(req.params.id);
            if (user) {
                const cards = await user.populate('card');
                return res.status(200).json(cards.card);
            }else{
                return res.status(404).json({ message: 'User Not found' });
            }
        }catch(err){
            next(err);
        }
    }
}

module.exports = new UserController();