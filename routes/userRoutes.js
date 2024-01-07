import {Router} from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
	showSingleUser,
	updateUser,
} from "../controller/userController.js";

const router = Router();
router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.get("/all-users", getAllUsers);
router.get("/get-user/:id", showSingleUser);
router.delete("/delete-one/:id", deleteUser);

export default router;
