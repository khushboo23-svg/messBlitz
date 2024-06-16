// const express = require('express');
// const router = express.Router();
// const Post = require('../database/schema/upvoteSchema');

// // Voting on a post
// router.post('/vote/:postId', async (req, res) => {
//   const { postId } = req.params;
//   const { userId, vote } = req.body; // vote can be 1 (upvote) or -1 (downvote)

//   try {
//     const post = await Post.findById(postId);
//     if (!post) return res.status(404).send('Post not found');

//     // Check if the user has already voted
//     const existingVote = post.votes.find(v => v.user.toString() === userId);
//     if (existingVote) {
//       // Update the existing vote if different
//       if (existingVote.vote !== vote) {
//         existingVote.vote = vote;
//       } else {
//         // Or remove the vote if the same vote is cast again
//         post.votes = post.votes.filter(v => v.user.toString() !== userId);
//       }
//     } else {
//       // Add new vote
//       post.votes.push({ user: userId, vote });
//     }

//     // Recalculate totalVotes
//     post.totalVotes = post.votes.reduce((acc, curr) => acc + curr.vote, 0);
    
//     await post.save();
//     res.json(post);
//   } catch (err) {
//     res.status(500).send(err.toString());
//   }
// });

// module.exports = router;
