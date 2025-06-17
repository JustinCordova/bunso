import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  snippet: { type: String }, // 👈 new field for teaser text
  creator: String,
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [String],
    default: [],
  },
  published: {
    type: Boolean,
    default: true,
  },
  slug: {
    type: String,
    unique: true,
  }
}, { timestamps: true });


const Post = mongoose.model('Post', postSchema);
export default Post;

// Old
// import mongoose from 'mongoose';

// const postSchema = mongoose.Schema({
//     title: String,
//     message: String,
//     creator: String,
//     tags: [String],
//     selectedFile: String,
//     likeCount: {
//         type: Number,
//         default: 0,
//     },
//     createdAt: {
//         type: Date,
//         default: new Date(),
//     },
// })

// var PostMessage = mongoose.model('PostMessage', postSchema);

// export default PostMessage;