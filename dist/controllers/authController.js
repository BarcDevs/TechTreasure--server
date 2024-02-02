"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrict = exports.protect = exports.signup = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorController_1 = require("./errorController");
const userModel_1 = __importDefault(require("../db/userModel"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const responseFactory_1 = require("../utils/responseFactory");
const generateJWT = (id) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new AppError_1.default(400, 'JWT secret is not defined');
    return jsonwebtoken_1.default.sign({ id }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });
};
exports.login = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new AppError_1.default(400, 'Please provide email and password'));
    const user = await userModel_1.default.findOne({ email }).select('+password');
    if (!user || !(await user.comparePasswords(password))) {
        return next(new AppError_1.default(401, 'Incorrect email or password'));
    }
    const token = generateJWT(`${user._id}`);
    user.password = '';
    (0, responseFactory_1.successResponse)(res, { user }, 200, { token });
});
exports.signup = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return next(new AppError_1.default(400, 'Please provide name, email and password'));
    let user;
    try {
        user = await userModel_1.default.create({ name, email, password });
    }
    catch (e) {
        if (e.code === 11000)
            return next(new AppError_1.default(400, 'Email already exists. You can use login instead.'));
        throw e;
    }
    const token = generateJWT(`${user._id}`);
    // todo send welcome email
    user.password = '';
    (0, responseFactory_1.successResponse)(res, { user }, 201, { token });
});
exports.protect = (0, errorController_1.catchAsync)(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token)
        return next(new AppError_1.default(401, 'You are not logged in! Please log in to get access.'));
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (!decoded)
        return next(new AppError_1.default(401, 'Invalid token. Please log in again.'));
    const user = await userModel_1.default.findById(decoded.id)
        .select('+passwordLastChangedAt');
    if (!user)
        return next(new AppError_1.default(401, 'The user belonging to this token does no longer exist.'));
    if (!user.passwordLastChangedAt || Number(user.passwordLastChangedAt) > (decoded.iat ?? 0) * 1000) {
        return next(new AppError_1.default(401, 'User recently changed password. Please log in again.'));
    }
    req.user = user;
    next();
});
const restrict = (roles) => (req, res, next) => {
    if (!req.user)
        return next(new AppError_1.default(401, 'You are not logged in! Please log in to get access.'));
    if (!roles.includes(req.user.role))
        return next(new AppError_1.default(403, 'You do not have permission to perform this action'));
    next();
};
exports.restrict = restrict;
