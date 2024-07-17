"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.schemaForStudent = void 0;
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    studentId: {
        type: String,
    },
    password: {
        type: String,
    },
    batchNo: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
exports.schemaForStudent = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    studentId: {
        type: String,
    },
    name: {
        type: String,
    },
});
exports.Student = (0, mongoose_1.model)("Student", studentSchema);
