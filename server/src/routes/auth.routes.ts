import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import verifyJwt from "../middlewares/JwtMiddleware";

const router = Router();

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get("/", verifyJwt, AuthController.auth);

router.post("/student/login", AuthController.studentLogin);

export const AuthRoutes = router;
