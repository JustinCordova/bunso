const commentSchema = mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  body: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('Comment', commentSchema);
