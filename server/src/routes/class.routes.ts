import { Router } from "express";
import { ClassController } from "../controllers/class.controller";

const router = Router();

router.post("/create-class", ClassController.createClass);

router.get("/", ClassController.getAllClass);

router.get("/by-batch/:batchNo", ClassController.getClassesByBatchNo);

router.get("/single/:id", ClassController.getSingleClass);

router.patch("/update/:id", ClassController.updateClass);

router.patch(
  "/students/update/attendance/:id",
  ClassController.updateStudentAttendanceStatus
);

router.delete("/delete/:id", ClassController.deleteClass);

export const ClassRoutes = router;
