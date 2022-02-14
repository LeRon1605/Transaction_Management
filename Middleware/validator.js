const Joi = require('joi');

const schemas = {
    userSchema: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().min(6).max(30).required(),
        name: Joi.string().min(3).max(30).required(),
        address: Joi.string().required(),
        gender: Joi.string().valid('Male', 'Female').required(),
        birth: Joi.date().required()
    })
};

const validator = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).json(result.error);
        }else{
            next();
        }
    }
}

module.exports = {
    schemas,
    validator
}