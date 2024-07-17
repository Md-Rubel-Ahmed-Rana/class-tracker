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
exports.AuthService = void 0;
const student_model_1 = require("../models/student.model");
const user_model_1 = require("../models/user.model");
const generateToken_1 = require("../utils/generateToken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const student_service_1 = require("./student.service");
const user_service_1 = require("./user.service");
class Service {
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPass = yield bcrypt_1.default.hash(user.password, 12);
            user.password = hashedPass;
            yield user_model_1.User.create(user);
        });
    }
    studentLogin(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield student_model_1.Student.findOne({ studentId: studentId });
            if (!student) {
                return false;
            }
            else {
                const token = (0, generateToken_1.generateToken)({ id: student.id, role: "student" });
                return token;
            }
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
            const token = (0, generateToken_1.generateToken)({ id: user.id, role: user.role });
            return token;
        });
    }
    auth(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            if (role === "student") {
                const getStudentInfo = yield student_service_1.StudentService.getMyInfo(id);
                return getStudentInfo;
            }
            else {
                const getUserInfo = yield user_service_1.UserService.findSingleUserById(id);
                return getUserInfo;
            }
        });
    }
}
exports.AuthService = new Service();
