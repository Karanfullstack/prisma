import {Router} from "express";
import {
	createPost,
	deletePost,
	getPosts,
	searchPost,
	updatePost,
} from "../controller/postController.js";

const router = Router();

router.get("/get-posts", getPosts);
router.post("/create-post", createPost);
router.delete("/delete-post/:id", deletePost);
router.put("/update-post/:id", updatePost);
router.get("/search", searchPost);
export default router;
