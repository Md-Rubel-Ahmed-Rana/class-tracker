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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_interface_1 = require("../interfaces/user.interface");
const user_model_1 = require("../models/user.model");
class Service {
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
