"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    app: {
        port: process.env.PORT ? Number(process.env.PORT) : 5000,
        env: process.env.NODE_ENV || "development",
    },
    database: {
        uri: process.env.DB_URI || "mongodb://localhost:27017/dev_database",
        mongodKey: process.env.MONGOD_SESSION_PRIVATE_KEY || "this is mongod key",
    },
    jwt: {
        accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || "defaultAccessTokenSecret",
        refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || "defaultRefreshTokenSecret",
        accessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRE || "3d",
        refreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRE || "30d",
    },
};
