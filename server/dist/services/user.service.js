"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const envConfig_1 = require("../config/envConfig");
const user_interface_1 = require("../interfaces/user.interface");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Service {
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPass = yield bcrypt_1.default.hash(user.password, 12);
            user.password = hashedPass;
            yield user_model_1.User.create(user);
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ email: credentials.email });
            if (!user) {
                return false;
            }
            const isMatched = yield bcrypt_1.default.compare(credentials.password, user.password);
            if (!isMatched) {
                return false;
            }
            const payload = {
                userId: user._id,
                email: user.email,
                role: user.role,
            };
            const accessToken = jsonwebtoken_1.default.sign(payload, envConfig_1.config.jwt.accessTokenSecret, {
                expiresIn: envConfig_1.config.jwt.accessTokenExpire,
            });
            return { accessToken };
        });
    }
    findUsers() {
        return __awaiter(this, arguments, void 0, function* (searchText = "", filters = {}, page = 1, limit = 10, sortDirection = "asc") {
            let pipeline = [{ $project: user_interface_1.UserProjection }];
            // Match stage for search
            if (searchText) {
                pipeline.push({
                    $match: {
                        $or: [
                            { name: { $regex: searchText, $options: "i" } },
                            { email: { $regex: searchText, $options: "i" } },
                        ],
                    },
                });
            }
            // Filter stage
            if (Object.keys(filters).length > 0) {
                const filterExpressions = Object.keys(filters).map((key) => ({
                    [key]: filters[key],
                }));
                pipeline.push({ $match: { $and: filterExpressions } });
            }
            // Sort stage
            if (sortDirection) {
                const sortObj = {};
                sortObj["name"] = sortDirection === "asc" ? 1 : -1;
                sortObj["email"] = sortDirection === "asc" ? 1 : -1;
                sortObj["createdAt"] = sortDirection === "asc" ? 1 : -1;
                sortObj["updatedAt"] = sortDirection === "asc" ? 1 : -1;
                pipeline.push({ $sort: sortObj });
            }
            // Pagination stage
            if (page && limit) {
                pipeline.push({
                    $skip: (page - 1) * limit,
                }, {
                    $limit: limit,
                });
            }
            const users = (yield user_model_1.User.aggregate(pipeline));
            return users;
        });
    }
    findSingleUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findById(userId).select(user_interface_1.UserProjection);
            return user;
        });
    }
    updateUser(userId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield user_model_1.User.findByIdAndUpdate(userId, {
                $set: Object.assign({}, updatedData),
            }, { upsert: true, new: true }).select(user_interface_1.UserProjection);
            return updatedUser;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.User.findByIdAndDelete(userId);
        });
    }
}
exports.UserService = new Service();
