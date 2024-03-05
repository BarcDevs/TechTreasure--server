"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const nodeConfig = {
    env: config_1.default.get('env'),
    port: config_1.default.get('port'),
    protocol: config_1.default.get('protocol'),
    host: config_1.default.get('host'),
    origin: config_1.default.get('origin'),
    url: config_1.default.get('url')
};
exports.default = nodeConfig;
