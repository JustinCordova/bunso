import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../api/index";
import { getPosts } from "../actions/posts";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("bunso_user"));
  const posts = useSelector((state) => state.posts) || [];
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio || "",
    profilePicture: user.profilePicture || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    if (!posts || posts.length === 0) {
      setIsLoading(true);
      dispatch(getPosts()).then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [posts, dispatch]);

  const userPosts = posts.filter((post) => post.creatorId?._id === user._id);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, profilePicture: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePic = () => {
    setForm((prev) => ({ ...prev, profilePicture: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      if (!form.name.trim() || !form.username.trim()) {
        setError("Name and username cannot be empty.");
        setSaving(false);
        return;
      }
      const { data } = await updateUser(user._id, form);
      localStorage.setItem("bunso_user", JSON.stringify(data));
      setEditMode(false);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white/5 rounded-xl shadow-lg flex flex-col items-center relative">
      {/* Edit Profile Button (top right) */}
      {!editMode && (
        <button
          onClick={() => setEditMode(true)}
          className="absolute top-4 right-4 px-5 py-2 rounded bg-[var(--color-light-purple)] text-white font-bold hover:bg-[var(--color-light-purple)]/80 transition shadow-lg z-20"
          style={{ position: "absolute", top: 16, right: 16 }}
        >
          Edit Profile
        </button>
      )}
      {/* Profile Picture */}
      <div className="mb-4 relative group">
        <img
          src={form.profilePicture || "/logo_t.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-[var(--color-light-purple)] shadow-lg"
        />
        {editMode && (
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfilePicChange}
              className="absolute left-0 top-0 w-32 h-32 opacity-0 cursor-pointer"
              title="Change profile picture"
            />
            {form.profilePicture && (
              <button
                onClick={handleRemovePic}
                className="absolute right-0 bottom-0 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                title="Remove profile picture"
              >
                &times;
              </button>
            )}
          </>
        )}
      </div>
      {/* Name and Username */}
      {editMode ? (
        <>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="text-3xl font-bold text-white mb-1 bg-transparent border-b border-white/20 focus:outline-none focus:border-[var(--color-light-purple)] text-center"
          />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="text-lg text-[var(--color-light-purple)] mb-2 bg-transparent border-b border-[var(--color-light-purple)] focus:outline-none text-center"
          />
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-white mb-1">{form.name}</h2>
          <div className="text-lg text-[var(--color-light-purple)] mb-2">
            @{form.username}
          </div>
        </>
      )}
      {/* Bio */}
      <div className="text-white/80 text-center mb-6 max-w-xl">
        {editMode ? (
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full bg-transparent border border-white/20 rounded p-2 text-white focus:outline-none focus:border-[var(--color-light-purple)]"
            rows={3}
            placeholder="Add a bio..."
          />
        ) : (
          form.bio || <span className="italic text-white/40">No bio yet.</span>
        )}
      </div>
      {/* Error */}
      {error && (
        <div className="bg-red-500/20 text-red-300 px-4 py-2 rounded text-sm mb-4">
          {error}
        </div>
      )}
      {/* Save/Cancel Buttons (only in edit mode) */}
      {editMode && (
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 rounded bg-[var(--color-light-purple)] text-white font-bold hover:bg-[var(--color-light-purple)]/80 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => {
              setEditMode(false);
              setForm({ ...form, ...user });
              setError("");
            }}
            disabled={saving}
            className="px-6 py-2 rounded bg-white/10 text-white font-bold hover:bg-white/20 transition disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      )}
      {/* User's Posts */}
      <div className="w-full mt-8">
        <h3 className="text-2xl font-semibold text-white mb-4">Posts</h3>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--color-light-purple)]"></div>
          </div>
        ) : userPosts.length === 0 ? (
          <div className="text-white/50 text-center">No posts yet.</div>
        ) : (
          <div className="flex flex-col gap-6">
            {userPosts.map((post) => (
              <Link
                to={`/posts/${post._id}`}
                key={post._id}
                className="block bg-white/10 rounded-lg p-4 hover:bg-white/20 transition"
              >
                <div className="flex items-center gap-4">
                  {post.selectedFile && (
                    <img
                      src={post.selectedFile}
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <div className="text-xl font-bold text-[var(--color-light-red)]">
                      {post.title}
                    </div>
                    <div className="text-white/70 text-sm mt-1">
                      {post.snippet}
                    </div>
                    <div className="text-xs text-white/40 mt-2">
                      {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
