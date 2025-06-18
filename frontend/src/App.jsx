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
import ProfilePage from "./pages/ProfilePage";

import PostDetails from "./pages/PostDetails";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./components/PrivateRoute";

import { getPosts } from "./actions/posts";

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        {/* Must be logged in to access these routes */}
        <Route
          path="*"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Routes>
                  <Route
                    path="/"
                    element={<Home setCurrentId={setCurrentId} />}
                  />
                  <Route
                    path="/posts/:id"
                    element={<PostDetails setCurrentId={setCurrentId} />}
                  />
                  <Route
                    path="/create"
                    element={
                      <Form currentId={currentId} setCurrentId={setCurrentId} />
                    }
                  />
                  <Route path="/edit/:id" element={<EditPost />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  {/* <Route path="/messages" element={<Messages />} />
                  <Route path="/bookmarks" element={<Bookmarks />} />
                  <Route path="/profile" element={<Profile />} /> */}
                </Routes>
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
