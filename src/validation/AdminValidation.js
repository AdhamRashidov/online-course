import Joi from "joi";
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;

class AdminValidator {

    create() {
        return Joi.object({
            username: Joi.string().required().messages({
                'string.base': "username satr bo'lishi kerak",
                'string.empty': "username yozilishi shart! bo'sh bo'lmasin"
            }),
            email: Joi.string().email().required().messages({
                'string.base': "email satr bo'lishi kerak",
                'string.empty': "email yozilishi shart! bo'sh bo'lmasin",
                'string.email': "email formati noto'g'ri"
            }),
            password: Joi.string().required().pattern(passRegex).messages({
                'string.base': "parol satr bo'lishi kerak",
                'string.empty': "parol yozilishi shart! bo'sh bo'lmasin",
                'string.pattern.base': "parol kuchli emas!"
            })
        });
    }

    signin() {
        return Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        });
    }

    update() {
        return Joi.object({
            username: Joi.string().optional().messages({
                'string.base': "username satr bo'lishi kerak",
            }),
            email: Joi.string().optional().email().messages({
                'string.base': "email satr bo'lishi kerak",
                'string.email': "email formati noto'g'ri"
            }),
            password: Joi.string().optional().pattern(passRegex).messages({
                'string.base': "parol satr bo'lishi kerak",
                'string.pattern.base': "parol kuchli emas."
            })
        });
    }
}

export default new AdminValidator();