import { Router } from "express";
import { StudentController } from "../controllers/student.controller";
import { checkStudentAuth } from "../middlewares/checkStudentAuth";

const router = Router();

router.post("/create-student", StudentController.createStudent);

router.get("/", StudentController.getAllStudent);

router.get("/by-batch/:batchNo", StudentController.getStudentByBatchNo);

router.get("/single/:id", StudentController.getSingleStudent);

router.get("/my-info", checkStudentAuth, StudentController.getMyInfo);

router.patch("/update/:id", StudentController.updateStudent);

router.delete("/delete/:id", StudentController.deleteStudent);

export const StudentRoutes = router;
