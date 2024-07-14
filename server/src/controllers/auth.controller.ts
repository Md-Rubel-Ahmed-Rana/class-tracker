import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

class Controller {
  async studentLogin(req: Request, res: Response) {
    try {
      const { studentId } = req.body;
      const result = await AuthService.studentLogin(studentId);
      if (!result) {
        return res.status(401).json({ message: "Invalid studentId" });
      }
      req.session.studentId = studentId;
      console.log({ studentId: req.session?.studentId });
      res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Login failed" });
    }
  }
}

export const AuthController = new Controller();
