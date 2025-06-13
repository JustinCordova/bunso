import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../actions/posts";
import { format } from "date-fns";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-transparent border border-white/20 backdrop-blur-md rounded-lg shadow-md mt-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="
          inline-flex items-center space-x-1
          text-white
          bg-white/10
          hover:bg-white/20
          focus:outline-none focus:ring-1 focus:ring-white/30
          rounded px-3 py-1 font-medium shadow-sm transition duration-150 select-none mb-4
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>

      {/* Post Title */}
      <h1
        className="text-3xl font-bold mb-2"
        style={{ color: "var(--color-light-red)" }}
      >
        {post.title}
      </h1>

      {/* Timestamp */}
      <div className="text-sm text-white/80 mb-4">
        {format(new Date(post.createdAt), "MMMM d, yyyy h:mm a")}
      </div>

      {/* Image */}
      {post.selectedFile && (
        <img
          src={post.selectedFile}
          alt={post.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full transition-all duration-300 hover:bg-indigo-200 hover:text-indigo-800 hover:scale-105 cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Body */}
      <p className="text-white text-base leading-relaxed">{post.body}</p>
    </div>
  );
};

export default PostDetails;
