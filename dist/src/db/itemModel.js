"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const colorModel = new mongoose_1.Schema({
    hex: String,
    name: String
});
const imageModel = new mongoose_1.Schema({
    path: {
        type: String,
        required: [true, 'Image path is required']
    },
    color: String
});
const itemModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    mainImage: {
        type: [imageModel],
        minlength: [1, 'Main image is required']
    },
    images: {
        type: [imageModel],
        default: []
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    stock: {
        type: Number,
        default: 0
    },
    shippingFee: Number,
    rating: {
        type: Number,
        default: 4
    },
    votes: {
        type: Number,
        default: 0
    },
    sizes: [String],
    isNew: Boolean,
    defaultColor: String,
    // @ts-ignore
    colors: [colorModel],
    sale: Number,
    saleEndsAt: Date,
    oldPrice: Number,
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store',
        required: [true, 'Store is required']
    }
}, {
    suppressReservedKeysWarning: true
});
itemModel.index({ name: 'text' });
itemModel.index({ category: 'text' });
itemModel.index({ rating: -1 });
itemModel.index({ price: -1 });
const Item = (0, mongoose_1.model)('Item', itemModel);
exports.default = Item;
//# sourceMappingURL=itemModel.js.map