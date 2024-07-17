"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = require("../config/envConfig");
const verifyJwt = (req, res, next) => {
    try {
        const token = req.cookies["adc-class-tracker"];
        if (!token) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Token not provided",
                data: null,
            });
        }
        const user = jsonwebtoken_1.default.verify(token, envConfig_1.config.jwt.accessTokenSecret);
        if (!user) {
            res.clearCookie("adc-class-tracker");
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "Invalid token provided",
                data: null,
            });
        }
        req.id = user.id;
        req.role = user.role;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError") {
            res.clearCookie("adc-class-tracker");
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "Token expired or invalid",
                error: error.message,
            });
        }
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: "There was an error verifying the token",
            error: error.message,
        });
    }
};
exports.default = verifyJwt;
