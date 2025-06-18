import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import { useState, useEffect } from "react";
import { getPosts } from "../actions/posts";

const Posts = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts) || [];
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
  const limit = 10;

  useEffect(() => {
    setIsLoading(true);
    dispatch(getPosts(page, limit)).then((res) => {
      if (page === 1) {
        setAllPosts(res.posts);
      } else {
        setAllPosts((prev) => [...prev, ...res.posts]);
      }
      setTotal(res.total);
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, [page, dispatch]);

  if (isLoading && page === 1) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-light-purple)]"></div>
      </div>
    );
  }

  if (!allPosts || allPosts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg">
          No posts yet. Be the first to create one!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full">
      {allPosts.map((post) => (
        <div key={post._id} className="w-full max-w-2xl mx-auto">
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}

      {/* Load More Button */}
      {allPosts.length < total && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="mt-4 px-4 py-2 text-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Posts;
