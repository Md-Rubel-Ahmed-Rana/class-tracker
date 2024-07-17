"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_validator_1 = require("../validators/user.validator");
const authorizeMiddleware_1 = __importDefault(require("../middlewares/authorizeMiddleware"));
const router = (0, express_1.Router)();
router.get("/", user_controller_1.UserController.findUsers);
router.get("/single/:id", user_controller_1.UserController.findSingleUserById);
router.patch("/update/:id", (0, authorizeMiddleware_1.default)("admin"), (0, validateRequest_1.default)(user_validator_1.userValidationSchema.updateUserSchema), user_controller_1.UserController.updateUser);
router.delete("/delete/:id", (0, authorizeMiddleware_1.default)("admin"), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
