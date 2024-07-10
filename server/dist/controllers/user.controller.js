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
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class Controller {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_service_1.UserService.register(req.body);
                res
                    .status(201)
                    .json({ success: true, message: "Registered successfully!" });
            }
            catch (error) {
                console.error(`Error registering user: ${error}`);
                res.status(500).json({ success: false, message: "Registration failed" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.UserService.login(req.body);
                if (result === null || result === void 0 ? void 0 : result.accessToken) {
                    res.status(200).json({
                        success: true,
                        message: "Login successfully!",
                        accessToken: result.accessToken,
                    });
                }
                else {
                    res.status(401).json({
                        success: false,
                        message: "Login failed. Invalid credentials",
                    });
                }
            }
            catch (error) {
                console.error(`Error logging in user: ${error}`);
                res.status(500).json({ success: false, message: "Login failed" });
            }
        });
    }
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    success: true,
                    message: "User found successfully!",
                    data: req.user,
                });
            }
            catch (error) {
                console.error(`Error retrieving user data: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Failed to retrieve user data" });
            }
        });
    }
    findSingleUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.UserService.findSingleUserById(req.params.id);
                res.status(200).json({
                    success: true,
                    message: "User found successfully!",
                    data: user,
                });
            }
            catch (error) {
                console.error(`Error retrieving user data: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Failed to retrieve user data" });
            }
        });
    }
    findUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const searchText = (_a = req.query) === null || _a === void 0 ? void 0 : _a.searchText;
                const filters = (_b = req.query) === null || _b === void 0 ? void 0 : _b.filters;
                const page = Number(((_c = req.query) === null || _c === void 0 ? void 0 : _c.page) || "0");
                const limit = Number(((_d = req.query) === null || _d === void 0 ? void 0 : _d.limit) || "0");
                const sortDirection = (_e = req.query) === null || _e === void 0 ? void 0 : _e.sortDirection;
                const users = yield user_service_1.UserService.findUsers(searchText, filters, page, limit, sortDirection);
                res.status(200).json({
                    success: true,
                    message: "Users found successfully!",
                    data: users,
                });
            }
            catch (error) {
                console.error(`Error retrieving user data: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Failed to retrieve user data" });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const result = yield user_service_1.UserService.updateUser(userId, req.body);
                res.status(200).json({
                    success: true,
                    message: "User updated successfully!",
                    data: result,
                });
            }
            catch (error) {
                console.error(`Error updating user data: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Failed to update user data" });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                yield user_service_1.UserService.deleteUser(userId);
                res.status(200).json({
                    success: true,
                    message: "User deleted successfully!",
                    data: null,
                });
            }
            catch (error) {
                console.error(`Error deleting user data: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Failed to deleting user data" });
            }
        });
    }
}
exports.UserController = new Controller();
