import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

class Controller {
  async register(req: Request, res: Response) {
    try {
      await AuthService.register(req.body);
      res
        .status(201)
        .json({ success: true, message: "Registered successfully!" });
    } catch (error) {
      console.error(`Error registering user: ${error}`);
      res.status(500).json({ success: false, message: "Registration failed" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result: any = await AuthService.login(req.body);
      if (result) {
        res.cookie("adc-class-tracker", result, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.status(200).json({
          success: true,
          message: "Login successfully!",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Login failed. Invalid credentials",
        });
      }
    } catch (error) {
      console.error(`Error logging in user: ${error}`);
      res.status(500).json({ success: false, message: "Login failed" });
    }
  }

  async auth(req: Request, res: Response) {
    try {
      const { id, role } = req;
      const data = await AuthService.auth(id, role);
      res.status(200).json({
        success: true,
        message: "My info fetched successfully!",
        data: data,
      });
    } catch (error) {
      console.error(`Error retrieving user data: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Failed to retrieve user data" });
    }
  }

  async studentLogin(req: Request, res: Response) {
    try {
      const { studentId } = req.body;
      const result = await AuthService.studentLogin(studentId);
      if (!result) {
        return res.status(401).json({ message: "Invalid studentId" });
      } else {
        res.cookie("adc-class-tracker", result, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.status(200).json({
          success: true,
          message: "Login successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Login failed" });
    }
  }
}

export const AuthController = new Controller();
