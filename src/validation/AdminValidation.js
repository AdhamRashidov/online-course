import Joi from "joi";

class AdminValidator {
    constructor() {
        this.passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;
    }

    create(data) {
        const admin = Joi.object({
            username: Joi.string().required().messages({
                'string.base': "username satr bo'lishi kerak",
                'string.empty': "username yozilishi shart! bo'sh bo'lmasin"
            }),
            email: Joi.string().email().required().messages({
                'string.base': "email satr bo'lishi kerak",
                'string.empty': "email yozilishi shart! bo'sh bo'lmasin",
                'string.email': "email formati noto'g'ri"
            }),
            password: Joi.string().required().pattern(this.passRegex).messages({
                'string.base': "parol satr bo'lishi kerak",
                'string.empty': "parol yozilishi shart! bo'sh bo'lmasin",
                'string.pattern.base': "parol kuchli emas!"
            })
        });
        return admin.validate(data);
    }

    signin(data) {
        const admin = Joi.object({
            username: Joi.string().required().messages({
                'string.base': "username satr bo'lishi kerak",
                'string.empty': "username yozilishi shart? bo'sh bo'lmasin"
            }),
            password: Joi.string().required().pattern(this.passRegex).messages({
                'string.base': "parol satr bo'lishi kerak",
                'string.empty': "parol yozilishi shart! bo'sh bo'lmasin",
                'string.pattern.base': "parol kuchli emas!"
            })
        });
        return admin.validate(data);
    }

    update(data) {
        const admin = Joi.object({
            username: Joi.string().required().messages({
                'string.base': "username satr bo'lishi kerak",
                'string.empty': "username yozilishi shart! bo'sh bo'lmasin"
            }),
            email: Joi.string().required().email().messages({
                'string.base': "email satr bo'lishi kerak",
                'string.empty': "email yozilishi shart! bo'sh bo'lmasin",
                'string.email': "email formati noto'g'ri"
            }),
            password: Joi.string().required().pattern(this.passRegex).messages({
                'string.base': "parol satr bo'lishi kerak",
                'string.empty': "parol yozilishi shart! bo'sh bo'lmasin",
                'string.pattern.base': "parol kuchli emas."
            })
        });
        return admin.validate(data);
    }
}

export default new AdminValidator();