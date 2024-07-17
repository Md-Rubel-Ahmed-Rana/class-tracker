import { Router } from "express";
import { StudentController } from "../controllers/student.controller";

const router = Router();

router.post("/create-student", StudentController.createStudent);

router.get("/", StudentController.getAllStudent);

router.get("/by-batch/:batchNo", StudentController.getStudentByBatchNo);

router.get("/single/:id", StudentController.getSingleStudent);

router.patch("/update/:id", StudentController.updateStudent);

router.patch("/change-password", StudentController.updateStudentPassword);

router.delete("/delete/:id", StudentController.deleteStudent);

export const StudentRoutes = router;
