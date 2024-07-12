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
exports.StudentController = void 0;
const student_service_1 = require("../services/student.service");
class Controller {
    createStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield student_service_1.StudentService.createStudent(req.body);
                res.status(201).json({
                    success: true,
                    message: "Student created successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error creating Student: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Student creation failed" });
            }
        });
    }
    getMyInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentId = req.session.studentId;
                const data = yield student_service_1.StudentService.getMyInfo(studentId);
                res.status(200).json({
                    success: true,
                    message: "Student info fetched successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error fetching student info: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Student info fetching failed" });
            }
        });
    }
    getAllStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield student_service_1.StudentService.getAllStudent();
                res.status(200).json({
                    success: true,
                    message: "Students fetched successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error fetching Student: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Student fetching failed" });
            }
        });
    }
    getStudentByBatchNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield student_service_1.StudentService.getStudentByBatchNo(req.params.batchNo);
                res.status(200).json({
                    success: true,
                    message: "Students fetched by batch no. successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error fetching Student: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Student fetching failed" });
            }
        });
    }
    getSingleStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield student_service_1.StudentService.getSingleStudent(req.params.id);
                res.status(200).json({
                    success: true,
                    message: "Student fetched successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error fetching Student: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Student fetching failed" });
            }
        });
    }
    updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield student_service_1.StudentService.updateStudent(req.params.id, req.body);
                res.status(200).json({
                    success: true,
                    message: "Student updated successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error updating Student: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Student updating failed" });
            }
        });
    }
    deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield student_service_1.StudentService.deleteStudent(req.params.id);
                res.status(200).json({
                    success: true,
                    message: "Student deleted successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error deleting Student: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Student deleting failed" });
            }
        });
    }
}
exports.StudentController = new Controller();
