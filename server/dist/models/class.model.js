"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const mongoose_1 = require("mongoose");
const student_model_1 = require("./student.model");
const classSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: String,
    },
    classNo: {
        type: Number,
    },
    batchNo: {
        type: mongoose_1.Schema.Types.Mixed,
    },
    absenceStudents: {
        type: [student_model_1.schemaForStudent],
        default: [],
    },
    presentStudents: {
        type: [student_model_1.schemaForStudent],
        default: [],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
exports.Class = (0, mongoose_1.model)("Class", classSchema);
