import prisma from "../DB/db.config.js";

export const createComment = async (req, res) => {
	try {
		// increatement comment_count

		const {user_id, post_id, comment} = req.body;
		const NewComment = await prisma.comment.create({
			data: {
				user_id: Number(user_id),
				post_id: Number(post_id),
				comment,
			},
		});
		await prisma.post.update({
			where: {
				id: Number(post_id),
			},
			data: {
				comment_count: {
					increment: 1,
				},
			},
		});
		return res.status(201).json({message: "post created", success: true});
	} catch (error) {
		console.log(error);
		return res.json({message: "something went wrong.."});
	}
};

export const showComment = async (req, res) => {
	try {
		const comments = await prisma.comment.findMany({
			include: {
				user: {
					select: {
						name: true,
						email: true,
					},
				},
			},
		});
		return res.json({message: "All comments", success: true, comments});
	} catch (error) {
		console.log(error);
		return res.json({success: true, message: "something went wrong"});
	}
};

export const showSingleComment = async (req, res) => {
	try {
		const {id} = req.params;
		const comment = await prisma.comment.findUnique({
			where: {
				id: String(id),
			},
		});
		return res.json({message: "Single Comment", success: true, comment});
	} catch (error) {
		console.log(error);
		return res.json({message: "Something went wrong", status: false});
	}
};

export const deleteComment = async (req, res) => {
	try {
		const {id} = req.params;
		const {postId} = req.body;
		const comment = await prisma.comment.delete({
			where: {
				id: String(id),
			},
		});

		await prisma.post.update({
			where: {
				id: Number(postId),
			},
			data: {
				comment_count: {
					decrement: 1,
				},
			},
		});
		return res.json({
			message: "Single Comment Deleted",
			success: true,
			comment,
		});
	} catch (error) {
		console.log(error);
		return res.json({message: "Something went wrong", status: false});
	}
};
