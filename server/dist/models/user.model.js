"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const regx_1 = require("../utils/regx");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [regx_1.emailRegX, "Please fill a valid email address"],
    },
    role: {
        type: String,
        lowercase: true,
        default: "staff",
        enum: ["teacher", "staff", "admin"],
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
userSchema.index({ email: 1 });
exports.User = (0, mongoose_1.model)("User", userSchema);
