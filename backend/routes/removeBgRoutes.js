import express from "express";
import { removeBG } from "../controllers/removeBgController.js";
import MulterUpload from "../middlewares/middleware.js";

const router = express.Router();

router.post("/remove-bg", MulterUpload.single('image'),removeBG);

export default router;