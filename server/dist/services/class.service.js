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
exports.ClassService = void 0;
const class_model_1 = require("../models/class.model");
class Service {
    createClass(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield class_model_1.Class.create(data);
        });
    }
    getAllClass() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield class_model_1.Class.find({});
        });
    }
    getClassesByBatchNo(batchNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield class_model_1.Class.find({ batchNo: batchNo });
        });
    }
    getSingleClass(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield class_model_1.Class.findById(id);
        });
    }
    deleteClass(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield class_model_1.Class.findByIdAndDelete(id);
        });
    }
    updateClass(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield class_model_1.Class.findByIdAndUpdate(id, { $set: Object.assign({}, content) });
        });
    }
    updateStudentAttendanceStatus(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const { presentStudents, absenceStudents } = content;
            yield class_model_1.Class.findByIdAndUpdate(id, {
                $set: {
                    presentStudents: presentStudents,
                    absenceStudents: absenceStudents,
                },
            });
        });
    }
}
exports.ClassService = new Service();
