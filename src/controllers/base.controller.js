import { isValidObjectId } from "mongoose";
import { AppError } from '../error/AppError.js';
import { successRes } from '../utils/success-res.js';

export class BaseController {
    constructor(model) {
        this.model = model;
    }

    // post
    create = async (req, res, next) => {
        try {
            const data = await this.model.create(req.body);
            return successRes(res, data, 201);
        } catch (error) {
            next(error);
        }
    }

    // get 
    findAll = async (_, res, next) => {
        try {
            const data = await this.model.find();
            return successRes(res, data);
        } catch (error) {
            next(error);
        }
    }

    // get by id
    findById = async (req, res, next) => {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                throw new AppError('Invalid ObjectId', 400);
            }

            const data = await this.model.findById(id);
            if (!data) {
                throw new AppError('Not found', 404);
            }

            return successRes(res, data);

        } catch (error) {
            next(error);
        }
    }

    // update
    update = async (req, res, next) => {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                throw new AppError('Invalid ObjectId', 400);
            }

            const data = await this.model.findByIdAndUpdate(id, req.body, { new: true });
            if (!data) {
                throw new AppError('Not found', 404);
            }

            return successRes(res, data);

        } catch (error) {
            next(error);
        }
    }

    // delete
    delete = async (req, res, next) => {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                throw new AppError('InvalId ObjectId', 400);
            }

            const data = await this.model.findByIdAndDelete(id);
            if (!data) {
                throw new AppError('Not found', 404);
            }

            return successRes(res, {});
        } catch (error) {
            next(error);
        }
    }

    static async checkById(schmea, id) {
        if (!isValidObjectId(id)) {
            throw new AppError('Invalid object id', 400);
        }
        const data = await schmea.findById(id);
        if (!data) {
            throw new AppError('Not found', 404);
        }
        return data;
    }
}