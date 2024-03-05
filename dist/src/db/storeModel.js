"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storeModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
storeModel.virtual('products', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'store'
});
storeModel.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'store'
});
storeModel.virtual('owner', {
    ref: 'User',
    localField: '_id',
    foreignField: 'store'
});
const Store = (0, mongoose_1.model)('Store', storeModel);
exports.default = Store;
//# sourceMappingURL=storeModel.js.map