import { Router } from "express";
import { BatchController } from "../controllers/batch.controller";

const router = Router();

router.post("/create-batch", BatchController.createBatch);

router.get("/", BatchController.getAllBatch);

router.get("/single/:id", BatchController.getSingleBatch);

router.get("/details/:id", BatchController.getBatchDetails);

router.patch("/update/:id", BatchController.updateBatch);

router.delete("/delete/:id", BatchController.deleteBatch);

export const BatchRoutes = router;
