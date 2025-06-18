import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import post from "../assets/nav/post.png";
import messages from "../assets/nav/messages.png";
import saved from "../assets/nav/bookmarks.png";
import notifications from "../assets/nav/notifications.png";
import profile from "../assets/nav/profile.png";
import Searchbar from "./Searchbar";

const iconStyle = {
  filter: "invert(1)", // turns black icons white
};

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("bunso_user"));

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("bunso_token");
    localStorage.removeItem("bunso_user");
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="bg-dark-blue sticky top-0 z-50 shadow-md">
      <div className="relative flex items-center h-15 w-full px-6">
        {/* Left: fixed width */}
        <div className="flex items-center space-x-2 w-48">
          <Link
            to="/"
            className="text-2xl font-(family-name:--font-f2) font-bold text-(color:--color-light-red)"
          >
            bunso
          </Link>
          <Link to="/">
            <img
              src="public/logo_t.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
          </Link>
        </div>

        {/* Center: absolutely centered search bar */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-md">
          <Searchbar />
        </div>

        {/* Right: fixed width */}
        <nav className="flex items-center space-x-4 w-60 justify-end ml-auto">
          <Link
            to="/create"
            className="inline-block transition hover:scale-110"
          >
            <img
              src={post}
              alt="Post"
              className="w-9 h-9 object-contain"
              style={iconStyle}
            />
          </Link>
          <Link
            to="/messages"
            className="inline-block transition hover:scale-110"
          >
            <img
              src={messages}
              alt="Messages"
              className="w-9 h-9 object-contain"
              style={iconStyle}
            />
          </Link>
          <Link
            to="/bookmarks"
            className="inline-block transition hover:scale-110"
          >
            <img
              src={saved}
              alt="Saved"
              className="w-9 h-9 object-contain"
              style={iconStyle}
            />
          </Link>
          <Link
            to="/notifications"
            className="inline-block transition hover:scale-110"
          >
            <img
              src={notifications}
              alt="Notifications"
              className="w-9 h-9 object-contain"
              style={iconStyle}
            />
          </Link>
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="inline-block transition hover:scale-110 focus:outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-label="User menu"
            >
              <img
                src={profile}
                alt="User"
                className="w-9 h-9 object-contain"
                style={iconStyle}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                  {user?.username || user?.name || "User"}
                </div>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition border-b border-gray-200"
                >
                  Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
