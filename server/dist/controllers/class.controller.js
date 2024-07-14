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
exports.ClassController = void 0;
const class_service_1 = require("../services/class.service");
class Controller {
    createClass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield class_service_1.ClassService.createClass(req.body);
                res.status(201).json({
                    success: true,
                    message: "Class created successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error creating Class: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Class creation failed" });
            }
        });
    }
    getAllClass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield class_service_1.ClassService.getAllClass();
                res.status(200).json({
                    success: true,
                    message: "Classes fetched successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error fetching Class: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Class fetching failed" });
            }
        });
    }
    getClassesByBatchNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield class_service_1.ClassService.getClassesByBatchNo(req.params.batchNo);
                res.status(200).json({
                    success: true,
                    message: "Classes fetched by batch no. successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error fetching Class: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Class fetching failed" });
            }
        });
    }
    getSingleClass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield class_service_1.ClassService.getSingleClass(req.params.id);
                res.status(200).json({
                    success: true,
                    message: "Class fetched successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error fetching Class: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Class fetching failed" });
            }
        });
    }
    updateClass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield class_service_1.ClassService.updateClass(req.params.id, req.body);
                res.status(200).json({
                    success: true,
                    message: "Class updated successfully!",
                    data: null,
                });
            }
            catch (error) {
                console.error(`Error updating Class: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Class updating failed" });
            }
        });
    }
    updateStudentAttendanceStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield class_service_1.ClassService.updateStudentAttendanceStatus(req.params.id, req.body);
                res.status(200).json({
                    success: true,
                    message: "Students statuses updated successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error updating student status: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Students status updating failed" });
            }
        });
    }
    deleteClass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield class_service_1.ClassService.deleteClass(req.params.id);
                res.status(200).json({
                    success: true,
                    message: "Class deleted successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error deleting Class: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Class deleting failed" });
            }
        });
    }
}
exports.ClassController = new Controller();
