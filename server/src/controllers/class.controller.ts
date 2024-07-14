import { Request, Response } from "express";
import { ClassService } from "../services/class.service";

class Controller {
  async createClass(req: Request, res: Response) {
    try {
      const data = await ClassService.createClass(req.body);
      res.status(201).json({
        success: true,
        message: "Class created successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error creating Class: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Class creation failed" });
    }
  }

  async getAllClass(req: Request, res: Response) {
    try {
      const data = await ClassService.getAllClass();
      res.status(200).json({
        success: true,
        message: "Classes fetched successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error fetching Class: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Class fetching failed" });
    }
  }

  async getClassesByBatchNo(req: Request, res: Response) {
    try {
      const data = await ClassService.getClassesByBatchNo(req.params.batchNo);
      res.status(200).json({
        success: true,
        message: "Classes fetched by batch no. successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error fetching Class: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Class fetching failed" });
    }
  }

  async getSingleClass(req: Request, res: Response) {
    try {
      const data = await ClassService.getSingleClass(req.params.id);
      res.status(200).json({
        success: true,
        message: "Class fetched successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error fetching Class: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Class fetching failed" });
    }
  }

  async updateClass(req: Request, res: Response) {
    try {
      await ClassService.updateClass(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Class updated successfully!",
        data: null,
      });
    } catch (error) {
      console.error(`Error updating Class: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Class updating failed" });
    }
  }

  async updateStudentAttendanceStatus(req: Request, res: Response) {
    try {
      const data = await ClassService.updateStudentAttendanceStatus(
        req.params.id,
        req.body
      );
      res.status(200).json({
        success: true,
        message: "Students statuses updated successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error updating student status: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Students status updating failed" });
    }
  }

  async deleteClass(req: Request, res: Response) {
    try {
      const data = await ClassService.deleteClass(req.params.id);
      res.status(200).json({
        success: true,
        message: "Class deleted successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error deleting Class: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Class deleting failed" });
    }
  }
}

export const ClassController = new Controller();
