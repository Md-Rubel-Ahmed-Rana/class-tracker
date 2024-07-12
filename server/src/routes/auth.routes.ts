import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/student/login", AuthController.studentLogin);

export const AuthRoutes = router;
