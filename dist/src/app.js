"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// @ts-ignore
const express_xss_sanitizer_1 = require("express-xss-sanitizer");
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const errorController_1 = require("./controllers/errorController");
const nodeConfig_1 = __importDefault(require("./nodeConfig"));
const app = (0, express_1.default)();
app.use((0, express_xss_sanitizer_1.xss)());
/* cors */
app.use((0, cors_1.default)({
    origin: nodeConfig_1.default.origin,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'X-Auth-Token', 'X-Request-With']
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.get('/', (req, res) => {
    res.send('This is api for TechTreasure app. check api docs for more details');
});
app.use('/api', routes_1.default);
app.all('*', errorController_1.notFound);
// todo not working
app.use(errorController_1.errorHandler);
exports.default = app;
