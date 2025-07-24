import Admin from '../models/admin.model.js';
import { BaseController } from './base.controller.js';
import crypto from '../utils/Crypto.js';

class AdminController extends BaseController {
    constructor() {
        super(Admin);
    }

    async createAdmin(req, res) {
        try {
            const { username, email, password, hashedPassword } = req.body;
            const adminPass = password || hashedPassword;
            const existsUsername = await Admin.findOne({ username });
            if (existsUsername) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Username Already Exists'
                });
            }

            const existsEmail = await Admin.findOne({ email });
            if (existsEmail) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Email Already Exists'
                });
            }

            const hashedPass = await crypto.encrypt(adminPass);
            const admin = await Admin.create({
                username,
                email,
                hashedPassword: hashedPass
            });

            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: admin
            });

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal Server Error'
            });
        }
    }

    async signIn(req, res) {
        try {
            const { username, password } = req.body;
            const admin = await Admin.findOne({ username });
            const isMatchedPassword = await crypto.decrypt(password, admin?.hashedPassword ?? '');
            if (!isMatchedPassword) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Username or password incorrect'
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: admin
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal Server Error'
            });
        }
    }
}

export default new AdminController();