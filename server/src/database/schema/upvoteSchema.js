const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vote: { type: Number, enum: [1, -1] } // 1 for upvote, -1 for downvote
});

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  votes: [voteSchema],
  totalVotes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Post', postSchema);
