import { Request, Response } from "express";
import { StudentService } from "../services/student.service";

class Controller {
  async createStudent(req: Request, res: Response) {
    try {
      const data = await StudentService.createStudent(req.body);
      res.status(201).json({
        success: true,
        message: "Student created successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error creating Student: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Student creation failed" });
    }
  }

  async getAllStudent(req: Request, res: Response) {
    try {
      const data = await StudentService.getAllStudent();
      res.status(200).json({
        success: true,
        message: "Students fetched successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error fetching Student: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Student fetching failed" });
    }
  }
  async getStudentByBatchNo(req: Request, res: Response) {
    try {
      const data = await StudentService.getStudentByBatchNo(req.params.batchNo);
      res.status(200).json({
        success: true,
        message: "Students fetched by batch no. successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error fetching Student: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Student fetching failed" });
    }
  }

  async getSingleStudent(req: Request, res: Response) {
    try {
      const data = await StudentService.getSingleStudent(req.params.id);
      res.status(200).json({
        success: true,
        message: "Student fetched successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error fetching Student: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Student fetching failed" });
    }
  }

  async updateStudent(req: Request, res: Response) {
    try {
      const data = await StudentService.updateStudent(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Student updated successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error updating Student: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Student updating failed" });
    }
  }

  async deleteStudent(req: Request, res: Response) {
    try {
      const data = await StudentService.deleteStudent(req.params.id);
      res.status(200).json({
        success: true,
        message: "Student deleted successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error deleting Student: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Student deleting failed" });
    }
  }
}

export const StudentController = new Controller();
