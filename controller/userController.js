import prisma from "../DB/db.config.js";

export const createUser = async (req, res) => {
	try {
		console.log(req.body);
		const {name, email, password} = req.body;
		console.log(name, email, password);
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (user) {
			return res.json({success: false, message: "User is already registered!"});
		}
		const newUser = await prisma.user.create({
			data: {name, email, password},
		});
		return res.json({success: true, message: "new user created"});
	} catch (error) {
		console.log(error);
	}
};

// update user controller

export const updateUser = async (req, res) => {
	try {
		const {id} = req.params;
		const {name, email, password} = req.body;
		const user = await prisma.user.update({
			where: {
				id: Number(id),
			},
			data: {
				name,
				email,
				password,
			},
		});
		if (!user) return res.json({success: false, message: "User Not Found.."});
		res.json({success: true, message: "User updated", user});
	} catch (error) {
		return res.json({message: "User Update Failed", success: false});
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany({
			select: {
				_count: {
					select: {
						post: true,
						comment: true,
					},
				},
			},
		});

		if (!users) return res.json({success: false, message: "Not users found!"});
		res.json({success: true, message: "All users fetched", users});
	} catch (error) {
		return res.json({
			success: false,
			message: "something went wrong..",
			error: error.message,
		});
	}
};

export const showSingleUser = async (req, res) => {
	try {
		const {id} = req.params;
		const user = await prisma.user.findUnique({
			where: {
				id: Number(id),
			},
			include: {
				post: true,
				comment: true,
			},
		});

		user.post.forEach((item) => {
			item.comment_count = item.comment_count.toString();
		});

		if (!user) return res.json({success: false, message: "No user found"});
		return res.json({message: "User found", success: true, user});
	} catch (error) {
		return res.json({message: "something went wrong..", error: error.message});
	}
};

export const deleteUser = async (req, res) => {
	try {
		const {id} = req.params;
		const user = await prisma.user.delete({
			where: {
				id: Number(id),
			},
		});

		return res.json({success: true, message: "User deleted", user});
	} catch (error) {
		return res.json({
			success: false,
			message: "somethingn went wrong",
			error: error.meta.cause,
		});
	}
};
