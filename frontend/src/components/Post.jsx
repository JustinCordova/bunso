import { useDispatch } from "react-redux";
import { likePost } from "../actions/posts";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <div
  className="w-full bg-transparent rounded-lg shadow-md overflow-hidden p-4 relative flex flex-col justify-between h-full border border-white/5 backdrop-blur-md hover:bg-[rgba(187,154,247,0.05)] transition-colors duration-600"
>
      {/* Image */}
      {post.selectedFile && (
        <img
          src={post.selectedFile}
          alt={post.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      {/* Content */}
      <div className="flex-1">
        {/* Date and Time (white) */}
        <div className="flex justify-between text-sm text-white/80 mb-1">
          <div>{format(new Date(post.createdAt), "MMMM d, yyyy")}</div>
          <div>{format(new Date(post.createdAt), "h:mm a")}</div>
        </div>

        {/* Title */}
        <Link
          to={`/posts/${post._id}`}
          className="text-xl font-semibold relative inline-block group text-[var(--color-light-red)] hover:text-[var(--color-light-purple)] transition-colors duration-700"
        >
          {post.title}
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[var(--color-light-purple)] transition-all duration-500 group-hover:w-full"></span>
        </Link>

        {/* Snippet (white) */}
        <p className="text-white text-sm mb-3 mt-2">{post.snippet}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full transition-all duration-300 hover:bg-indigo-200 hover:text-indigo-800 hover:scale-105 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Like Button (white) */}
      <div className="flex items-center justify-start mt-4">
        <button
          onClick={() => dispatch(likePost(post._id))}
          className="flex items-center gap-1 text-white hover:text-pink-500 transition-all duration-300 focus:outline-none group"
        >
          <FiHeart className="text-lg transition-transform duration-300 group-hover:scale-110" />
          <span>{post.likeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
