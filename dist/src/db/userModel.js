"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const vars_1 = __importDefault(require("../../config/vars"));
const userModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    passwordLastChangedAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    billingDetails: [mongoose_1.Schema.Types.Mixed],
    cart: mongoose_1.Schema.Types.Mixed,
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetToken: {
        type: String,
        select: false
    },
    resetTokenExpiration: {
        type: Date,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'seller'],
        default: 'user'
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store'
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
userModel.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'user'
});
userModel.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcrypt_1.default.genSalt(Number(vars_1.default.bcryptSaltRounds) || 10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
    this.passwordLastChangedAt = Date.now();
    next();
});
userModel.pre('save', function (next) {
    if (!this.isModified('role'))
        return next();
    if (this.role !== 'seller' && this.store)
        this.store = undefined;
    next();
});
userModel.methods.comparePasswords = async function (password) {
    return await bcrypt_1.default.compare(password, this.password);
};
const User = (0, mongoose_1.model)('User', userModel);
exports.default = User;
