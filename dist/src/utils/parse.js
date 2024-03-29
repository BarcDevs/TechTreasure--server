"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.parseFormData = void 0;
const parseFormData = (data) => {
    const obj = {};
    for (const [key, value] of Object.entries(data)) {
        if (value === 'undefined')
            continue;
        if (typeof value === 'string') {
            obj[key] = JSON.parse(value);
        }
        else {
            obj[key] = value;
        }
    }
    return obj;
};
exports.parseFormData = parseFormData;
const parse = (value) => {
    if (!value)
        return;
    return value === 'undefined' ? undefined : JSON.parse(value);
};
exports.parse = parse;
//# sourceMappingURL=parse.js.map