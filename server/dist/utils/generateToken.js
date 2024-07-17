"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const envConfig_1 = require("../config/envConfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, envConfig_1.config.jwt.accessTokenSecret, {
        expiresIn: envConfig_1.config.jwt.accessTokenExpire,
    });
    return token;
};
exports.generateToken = generateToken;
