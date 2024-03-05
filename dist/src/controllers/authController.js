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
const responseFactory_1 = require("../services/responseFactory");
const userServices_1 = require("../services/userServices");
const vars_1 = __importDefault(require("../../config/vars"));
const express_validator_1 = require("express-validator");
const generateJWT = (id) => {
    if (!vars_1.default.jwtSecret)
        throw new AppError_1.default(400, 'JWT secret is not defined');
    return jsonwebtoken_1.default.sign({ id }, vars_1.default.jwtSecret, {
        expiresIn: vars_1.default.jwtExpiresIn || '1d'
    });
};
const sendCredentials = (res, token) => {
    res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        expires: new Date(Date.now() + Number(vars_1.default.jwtCookieExpiresIn) * 24 * 60 * 60 * 1000)
    });
    res.cookie('XSRF-TOKEN', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true
    });
};
/**
 * Handles the entire process of a user login.
 */
exports.login = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new AppError_1.default(400, 'Please provide email and password'));
    const user = await (0, userServices_1.findUserWithPassword)({ email });
    if (!user || !(await user.comparePasswords(password)))
        return next(new AppError_1.default(401, 'Incorrect email or password'));
    const token = generateJWT(`${user._id}`);
    user.password = '';
    sendCredentials(res, token);
    (0, responseFactory_1.successResponse)(res, { user }, 200);
});
/**
 * Handles the entire process of a user signup.
 */
exports.signup = (0, errorController_1.catchAsync)(async (req, res, next) => {
    const { name, email, password } = (0, express_validator_1.matchedData)(req);
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
    sendCredentials(res, token);
    (0, responseFactory_1.successResponse)(res, { user }, 201);
});
/**
 * A middleware that protects routes from unauthorized users.
 * - The middleware checks if the user is logged in or not.
 * - If the user is not logged in, it returns an error back to the client.
 * - If the user is logged in, it saves the user object in the request object as req.user, in order to be used in next middlewares.
 */
exports.protect = (0, errorController_1.catchAsync)(async (req, res, next) => {
    // if (!req.headers.authorization?.startsWith('Bearer'))
    //   return next(new AppError(401, 'You are not logged in! Please log in to get access.'))
    //
    // const token = req.headers.authorization.split(' ')[1]
    const token = req.cookies.jwt;
    if (!token)
        return next(new AppError_1.default(401, 'You are not logged in! Please log in to get access.'));
    if (!vars_1.default.jwtSecret)
        throw new AppError_1.default(400, 'JWT secret is not defined');
    const decoded = jsonwebtoken_1.default.verify(token, vars_1.default.jwtSecret);
    if (!decoded)
        return next(new AppError_1.default(401, 'Invalid token. Please log in again.'));
    const user = await (0, userServices_1.findUserById)(decoded.id, '+passwordLastChangedAt');
    if (!user)
        return next(new AppError_1.default(401, 'The user belonging to this token does no longer exist.'));
    if (!user.passwordLastChangedAt || Number(user.passwordLastChangedAt) > (decoded.iat ?? 0) * 1000)
        return next(new AppError_1.default(401, 'User recently changed password. Please log in again.'));
    req.user = user;
    next();
});
/**
 * Middleware to restrict access based on user roles.
 *
 * @param {Role[]} roles - array of roles allowed to access
 *
 * - Must be placed after a protect middleware, so it will be able to access the saved user in req.user
 * - If the user role is not in the array, it returns an error back to the client.
 */
const restrict = (roles) => (req, res, next) => {
    if (!req.user)
        return next(new AppError_1.default(401, 'You are not logged in! Please log in to get access.'));
    if (!roles.includes(req.user.role))
        return next(new AppError_1.default(403, 'You do not have permission to perform this action'));
    next();
};
exports.restrict = restrict;
//# sourceMappingURL=authController.js.map