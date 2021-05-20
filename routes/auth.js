import express from "express";
import multer from "multer";

import { signin, signup, imageUpload } from "../controllers/auth.js";
import fileValidator from "../middleware/fileValidation.js";

const router = express.Router();
const upload = multer();

router.post("/signin", signin);
router.post("/signup", signup);
router.post(
	"/imageupload",
	upload.single("ImageFile"),
	fileValidator,
	imageUpload
);

export default router;
