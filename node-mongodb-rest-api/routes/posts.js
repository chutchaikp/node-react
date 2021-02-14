const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find({}).limit(3);
		res.status(200).send(posts);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Get specific post
router.get("/:postId", async (req, res) => {
	try {
		const { postId } = req.params;
		const posts = await Post.findById(postId);
		res.send(posts);
	} catch (error) {
		res.send(error);
	}
});

// Delete specific post
router.delete("/:postId", async (req, res) => {
	try {
		const { postId } = req.params;
		const deleted = await Post.findByIdAndRemove(postId);
		console.log(deleted);
		res.status(200).send(deleted);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Update
router.patch("/:postId", async (req, res) => {
	try {
		const updated = await Post.findByIdAndUpdate(req.params.postId, { $set: { title: req.body.title } });
		res.status(200).send(updated);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Submit post
router.post('/add', async (req, res) => {
	const post = new Post({
		title: req.body.title,
		description: req.body.description
	});

	try {
		const saved = await post.save();
		res.send(saved);
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;