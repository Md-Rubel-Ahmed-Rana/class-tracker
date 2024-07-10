"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batch = void 0;
const mongoose_1 = require("mongoose");
const student_model_1 = require("./student.model");
const batchSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    batchNo: {
        type: String,
    },
    students: {
        type: [student_model_1.schemaForStudent],
        default: [],
    },
    startingDate: {
        type: Date || String,
        required: true,
    },
    endingDate: {
        type: Date || String,
        default: null,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
exports.Batch = (0, mongoose_1.model)("Batch", batchSchema);
