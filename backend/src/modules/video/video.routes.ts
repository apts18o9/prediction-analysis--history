import { Router } from "express";
import {ingestVideoHandler} from "./video.controller"

const router = Router();

router.post("/ingest", ingestVideoHandler);

export default router;
