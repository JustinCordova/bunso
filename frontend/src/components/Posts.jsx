import { useSelector } from "react-redux";
import Post from "./Post";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts) || [];

  if (!posts.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full">
      {posts.map((post) => (
        <div key={post._id} className="w-full max-w-2xl mx-auto">
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
