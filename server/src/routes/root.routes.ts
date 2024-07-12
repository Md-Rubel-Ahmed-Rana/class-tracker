import { Router } from "express";
import { UserRoutes } from "./user.routes";
import { BatchRoutes } from "./batch.routes";
import { ClassRoutes } from "./class.routes";
import { StudentRoutes } from "./student.routes";
import { AuthRoutes } from "./auth.routes";

const router = Router();

router.use("/user", UserRoutes);

router.use("/batch", BatchRoutes);

router.use("/class", ClassRoutes);

router.use("/student", StudentRoutes);

router.use("/auth", AuthRoutes);

export const RootRoutes = router;
