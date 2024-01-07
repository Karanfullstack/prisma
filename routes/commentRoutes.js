import {Router} from "express";
import {
	createComment,
	deleteComment,
	showComment,
	showSingleComment,
} from "../controller/commentController.js";
const router = Router();

router.get("/comments", showComment);
router.post("/create-comment", createComment);
router.get("/show-comment/:id", showSingleComment);
router.delete("/delete-comment/:id", deleteComment);

export default router;
