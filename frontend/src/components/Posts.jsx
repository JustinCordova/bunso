import { useSelector } from "react-redux";
import Post from "./Post";
import { useState, useEffect } from "react";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only set loading to false if posts is an array (meaning it's been loaded)
    if (Array.isArray(posts)) {
      setIsLoading(false);
    }
  }, [posts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-light-purple)]"></div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg">
          No posts yet. Be the first to create one!
        </p>
      </div>
    );
  }

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const visiblePosts = sortedPosts.slice(0, visibleCount);

  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full">
      {visiblePosts.map((post) => (
        <div key={post._id} className="w-full max-w-2xl mx-auto">
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}

      {/* Load More Button */}
      {visibleCount < sortedPosts.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 5)}
          className="mt-4 px-4 py-2 text-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Posts;
