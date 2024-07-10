import { Request, Response } from "express";
import { BatchService } from "../services/batch.service";

class Controller {
  async createBatch(req: Request, res: Response) {
    try {
      const data = await BatchService.createBatch(req.body);
      res.status(201).json({
        success: true,
        message: "Batch created successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error creating batch: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Batch creation failed" });
    }
  }

  async getAllBatch(req: Request, res: Response) {
    try {
      const data = await BatchService.getAllBatch();
      res.status(200).json({
        success: true,
        message: "Batches fetched successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error fetching batch: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Batch fetching failed" });
    }
  }

  async getSingleBatch(req: Request, res: Response) {
    try {
      const data = await BatchService.getSingleBatch(req.params.id);
      res.status(200).json({
        success: true,
        message: "Batch fetched successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error fetching batch: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Batch fetching failed" });
    }
  }

  async updateBatch(req: Request, res: Response) {
    try {
      const data = await BatchService.updateBatch(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Batch updated successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error updating batch: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Batch updating failed" });
    }
  }

  async deleteBatch(req: Request, res: Response) {
    try {
      const data = await BatchService.deleteBatch(req.params.id);
      res.status(200).json({
        success: true,
        message: "Batch deleted successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error deleting batch: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Batch deleting failed" });
    }
  }
}

export const BatchController = new Controller();
