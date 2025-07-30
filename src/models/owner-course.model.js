import { Schema, model } from "mongoose";
import { Roles } from "../const";

const OwnerSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    hashedPassword: { type: String, required: true },
    wallet: { type: Number, unique: true },
    experience: { type: String },
    role: {type: String, default: Roles.OWNER}
}, { timestamps: true, versionKey: false });

const Owner = model('Owner', OwnerSchema);
export default Owner;