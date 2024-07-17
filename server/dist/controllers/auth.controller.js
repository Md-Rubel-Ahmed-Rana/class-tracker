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
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class Controller {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_service_1.AuthService.register(req.body);
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
                const result = yield auth_service_1.AuthService.login(req.body);
                if (result) {
                    res.cookie("adc-class-tracker", result, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true,
                    });
                    res.status(200).json({
                        success: true,
                        message: "Login successfully!",
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
                const { id, role } = req;
                const data = yield auth_service_1.AuthService.auth(id, role);
                res.status(200).json({
                    success: true,
                    message: "My info fetched successfully!",
                    data: data,
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
    studentLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.body;
                const result = yield auth_service_1.AuthService.studentLogin(studentId);
                if (!result) {
                    return res.status(401).json({ message: "Invalid studentId" });
                }
                else {
                    res.cookie("adc-class-tracker", result, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true,
                    });
                    res.status(200).json({
                        success: true,
                        message: "Login successfully!",
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: "Login failed" });
            }
        });
    }
}
exports.AuthController = new Controller();
