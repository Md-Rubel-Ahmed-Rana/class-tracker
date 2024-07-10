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
exports.BatchController = void 0;
const batch_service_1 = require("../services/batch.service");
class Controller {
    createBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield batch_service_1.BatchService.createBatch(req.body);
                res.status(201).json({
                    success: true,
                    message: "Batch created successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error creating batch: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Batch creation failed" });
            }
        });
    }
    getAllBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield batch_service_1.BatchService.getAllBatch();
                res.status(200).json({
                    success: true,
                    message: "Batches fetched successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error fetching batch: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Batch fetching failed" });
            }
        });
    }
    getSingleBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield batch_service_1.BatchService.getSingleBatch(req.params.id);
                res.status(200).json({
                    success: true,
                    message: "Batch fetched successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error fetching batch: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Batch fetching failed" });
            }
        });
    }
    updateBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield batch_service_1.BatchService.updateBatch(req.params.id, req.body);
                res.status(200).json({
                    success: true,
                    message: "Batch updated successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error updating batch: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Batch updating failed" });
            }
        });
    }
    deleteBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield batch_service_1.BatchService.deleteBatch(req.params.id);
                res.status(200).json({
                    success: true,
                    message: "Batch deleted successfully!",
                    data: data,
                });
            }
            catch (error) {
                console.error(`Error deleting batch: ${error}`);
                res
                    .status(500)
                    .json({ success: false, message: "Batch deleting failed" });
            }
        });
    }
}
exports.BatchController = new Controller();
