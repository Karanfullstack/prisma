import prisma from "../DB/db.config.js";
import {Prisma} from "@prisma/client";

export const getPosts = async (req, res) => {
	try {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;

		if (page <= 0) page = 1;
		if (limit > 100 || limit < 0) limit = 10;
		const skip = (page - 1) * limit;
		const posts = await prisma.post.findMany({
			skip: skip,
			take: limit,
			orderBy: {
				id: "desc",
			},
			include: {
				user: true,
			},
		});

		const totalPosts = await prisma.post.count();
		const totalPages = Math.ceil(totalPosts / limit);
		if (posts.length === 0)
			return res.json({success: false, message: "No Posts!"});

		const post_bint = posts.map((item) => ({
			...item,
			comment_count: item.comment_count.toString(),
		}));
		return res.json({
			success: true,
			post_count: post_bint.length,
			message: "Posts-All",
			post_bint,
			meta: {
				totalPages,
				currentPage: page,
				limit: limit,
			},
		});
	} catch (error) {
		console.log(error.message);
		return res.json({
			message: "something went wrong..",
			success: false,
			error: error.message,
		});
	}
};

export const createPost = async (req, res) => {
	try {
		const {user_id, title, description} = req.body;

		const post = await prisma.post.create({
			data: {
				user_id: Number(user_id),
				title,
				description,
			},
		});
		const BigIntSerialize = {
			...post,
			comment_count: post.comment_count.toString(),
		};
		return res.json({success: true, message: "Post created", BigIntSerialize});
	} catch (error) {
		return res.json({
			message: "something went wrong..",
			success: false,
			error: error.message,
		});
	}
};

export const deletePost = async (req, res) => {
	try {
		const {id} = req.params;
		const post = await prisma.post.delete({
			where: {
				id: Number(id),
			},
		});

		if (!post) {
			// Post not found
			return res.status(404).json({
				success: false,
				message: "Post not found",
			});
		}

		return res.json({
			success: true,
			message: "Post deleted",
		});
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2025"
		) {
			return res.json({success: false, message: "Post Not Found"});
		}
		res.json({success: false, message: "something went wrong"});
	}
};

export const updatePost = async (req, res) => {
	try {
		const {id} = req.params;
		const {title, description} = req.body;
		const post = await prisma.post.update({
			where: {
				id: Number(id),
			},
			data: {
				title,
				description,
			},
		});
		// seriallized bigint
		const newPost = {
			...post,
			comment_count: post.comment_count.toString(),
		};
		return res.json({message: "Post Updated", success: true, newPost});
	} catch (error) {
		console.log(error);
		return res.json({message: "something went wrong", success: false});
	}
};

// search post full text

export const searchPost = async (req, res) => {
	try {
		const query = req.query.q;
		const search = await prisma.post.findMany({
			where: {
				title: {
					search: query,
				},
			},
		});
		search.forEach((item) => {
			item.comment_count = item.comment_count.toString();
		});
		return res.json({message: "all query posts", success: true, search});
	} catch (error) {
		console.log(error);
		return res.json({success: true, message: "something went wrong", error});
	}
};
