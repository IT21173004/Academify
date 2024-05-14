const Joi = require(`joi`);

const registerValidation = (data) => {

    const schema = Joi.object({
        role: Joi.string().valid('admin', 'instructor', 'learner'),
        name: Joi.string().regex(/^[a-zA-Z\s]+$/).min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(8).required(),
    });

    return schema.validate(data);
}

const loginValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(8).required(),
    });

    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;