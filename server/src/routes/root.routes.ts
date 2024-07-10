import { Router } from "express";
import { UserRoutes } from "./user.routes";
import { BatchRoutes } from "./batch.routes";
import { ClassRoutes } from "./class.routes";
import { StudentRoutes } from "./student.routes";

const router = Router();

router.use("/user", UserRoutes);

router.use("/batch", BatchRoutes);

router.use("/class", ClassRoutes);

router.use("/student", StudentRoutes);

export const RootRoutes = router;
