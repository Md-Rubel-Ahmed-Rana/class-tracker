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
exports.StudentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const batch_model_1 = require("../models/batch.model");
const student_model_1 = require("../models/student.model");
const generateIncrementalNumber_1 = require("../utils/generateIncrementalNumber");
class Service {
    createStudent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const latestStudent = yield student_model_1.Student.find({}).sort({ createdAt: -1 });
            const nextStudentNumber = (0, generateIncrementalNumber_1.generateIncrementalNumber)(((_a = latestStudent[0]) === null || _a === void 0 ? void 0 : _a.studentId) || "0000");
            const incrementalId = `${data.batchNo}-${nextStudentNumber}`;
            data.studentId = incrementalId;
            const isBatchExist = yield batch_model_1.Batch.findOne({ batchNo: data.batchNo });
            if (!isBatchExist) {
                return false;
            }
            else {
                const session = yield mongoose_1.default.startSession();
                session.startTransaction();
                try {
                    // database operation here
                    const newStudent = yield student_model_1.Student.create(data);
                    isBatchExist.students.push({
                        id: newStudent._id,
                        name: newStudent.name,
                        studentId: incrementalId,
                    });
                    yield isBatchExist.save();
                    yield session.commitTransaction();
                    session.endSession();
                }
                catch (error) {
                    yield session.abortTransaction();
                    session.endSession();
                    console.log(error);
                    return false;
                }
            }
        });
    }
    getAllStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield student_model_1.Student.find({});
        });
    }
    getMyInfo(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield student_model_1.Student.findOne({ studentId: studentId });
        });
    }
    getStudentByBatchNo(batchNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield student_model_1.Student.find({ batchNo: batchNo });
        });
    }
    getSingleStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield student_model_1.Student.findById(id);
        });
    }
    deleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                // Check if the student exists
                const student = yield student_model_1.Student.findById(id).session(session);
                if (!student) {
                    throw new Error("Student not found");
                }
                // Find the batch that contains the student
                const batch = yield batch_model_1.Batch.findOne({
                    "students.studentId": student.studentId,
                }).session(session);
                if (!batch) {
                    throw new Error("Batch not found");
                }
                // Delete the student
                yield student_model_1.Student.findByIdAndDelete(id).session(session);
                // Remove the student from the batch's students array
                batch.students.pull({ studentId: student.studentId });
                yield batch.save({ session });
                // Commit the transaction
                yield session.commitTransaction();
                session.endSession();
                return true;
            }
            catch (error) {
                // Abort the transaction
                yield session.abortTransaction();
                session.endSession();
                console.error(error);
                return false;
            }
        });
    }
    updateStudent(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield student_model_1.Student.findByIdAndUpdate(id, { $set: Object.assign({}, content) });
        });
    }
}
exports.StudentService = new Service();
