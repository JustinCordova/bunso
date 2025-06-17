import Posts from "../components/Posts";
import { useState } from "react";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <Posts setCurrentId={setCurrentId} />
      </div>
    </>
  );
};

export default Home;
