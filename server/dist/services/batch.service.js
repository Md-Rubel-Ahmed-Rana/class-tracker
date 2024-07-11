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
exports.BatchService = void 0;
const batch_model_1 = require("../models/batch.model");
const class_model_1 = require("../models/class.model");
const generateIncrementalNumber_1 = require("../utils/generateIncrementalNumber");
class Service {
    createBatch(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const latestBatch = yield batch_model_1.Batch.find({}).sort({ createdAt: -1 });
            const nextBatchNumber = (0, generateIncrementalNumber_1.generateIncrementalNumber)(((_a = latestBatch[0]) === null || _a === void 0 ? void 0 : _a.batchNo) || "ADC-WD-0000");
            const incrementalId = `ADC-WD-${nextBatchNumber}`;
            data.batchNo = incrementalId;
            return yield batch_model_1.Batch.create(data);
        });
    }
    getAllBatch() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield batch_model_1.Batch.find({});
        });
    }
    getSingleBatch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield batch_model_1.Batch.findById(id);
        });
    }
    getBatchDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const batch = yield batch_model_1.Batch.findById(id);
            const batchData = {
                id: batch === null || batch === void 0 ? void 0 : batch._id,
                name: batch === null || batch === void 0 ? void 0 : batch.name,
                endingDate: batch === null || batch === void 0 ? void 0 : batch.endingDate,
                batchNo: batch === null || batch === void 0 ? void 0 : batch.batchNo,
                startingDate: batch === null || batch === void 0 ? void 0 : batch.startingDate,
                createdAt: batch === null || batch === void 0 ? void 0 : batch.createdAt,
                updatedAt: batch === null || batch === void 0 ? void 0 : batch.updatedAt,
            };
            const studentData = batch === null || batch === void 0 ? void 0 : batch.students.map((student) => ({
                id: student === null || student === void 0 ? void 0 : student.id,
                studentId: student === null || student === void 0 ? void 0 : student.studentId,
                name: student === null || student === void 0 ? void 0 : student.name,
            }));
            const classes = yield class_model_1.Class.find({ batchNo: batch === null || batch === void 0 ? void 0 : batch.batchNo });
            return { batch: batchData, students: studentData, classes };
        });
    }
    deleteBatch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield batch_model_1.Batch.findByIdAndDelete(id);
        });
    }
    updateBatch(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield batch_model_1.Batch.findByIdAndUpdate(id, { $set: Object.assign({}, content) });
        });
    }
}
exports.BatchService = new Service();
