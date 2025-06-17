import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Form from "./pages/Form";
import EditPost from "./pages/EditPost";
// import Messages from "./pages/Messages";
// import Bookmarks from "./pages/Bookmarks";
// import Profile from "./pages/Profile";

import PostDetails from "./pages/PostDetails";

import { getPosts } from "./actions/posts";

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setCurrentId={setCurrentId} />} />
        <Route
          path="/posts/:id"
          element={<PostDetails setCurrentId={setCurrentId} />}
        />
        <Route
          path="/create"
          element={<Form currentId={currentId} setCurrentId={setCurrentId} />}
        />
        <Route path="/edit/:id" element={<EditPost />} />
        {/* <Route path="/messages" element={<Messages />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </>
  );
};

export default App;
