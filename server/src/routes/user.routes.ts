import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import validateRequest from "../middlewares/validateRequest";
import { userValidationSchema } from "../validators/user.validator";
import checkAuthorization from "../middlewares/authorizeMiddleware";

const router = Router();

router.get("/", UserController.findUsers);

router.get("/single/:id", UserController.findSingleUserById);

router.patch(
  "/update/:id",
  checkAuthorization("admin"),
  validateRequest(userValidationSchema.updateUserSchema),
  UserController.updateUser
);

router.delete(
  "/delete/:id",
  checkAuthorization("admin"),
  UserController.deleteUser
);

export const UserRoutes = router;
