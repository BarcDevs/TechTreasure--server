"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: process.env.PORT || 3000,
    protocol: process.env.PROTOCOL || 'http',
    host: process.env.HOST || 'localhost',
    origin: process.env.ORIGIN || 'http://localhost:5173',
    url: process.env.URL || 'http://localhost:3000',
};
