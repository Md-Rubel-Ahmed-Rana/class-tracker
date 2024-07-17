"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const JwtMiddleware_1 = __importDefault(require("../middlewares/JwtMiddleware"));
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.AuthController.register);
router.post("/login", auth_controller_1.AuthController.login);
router.get("/", JwtMiddleware_1.default, auth_controller_1.AuthController.auth);
router.post("/student/login", auth_controller_1.AuthController.studentLogin);
exports.AuthRoutes = router;
