# Bunso

**Bunso** is a modern blog and discussion platform that allows users to share posts, express opinions, and stay connected. It combines the simplicity of writing with the community features you'd expect from a social content app.

## Previews

<div style="display: flex; gap: 10px; justify-content: space-between;">
  <img src="./assets/sample1.png" alt="Preview 1" style="width: 32%; border-radius: 8px;" />
  <img src="./assets/sample2.png" alt="Preview 2" style="width: 32%; border-radius: 8px;" />
  <img src="./assets/sample3.png" alt="Preview 3" style="width: 32%; border-radius: 8px;" />
</div>

## 🚀 Features

- 📄 **Post Creation & Feed**

  - Create posts with a **title**, **body**, **tags**, and **image**
  - Paginated feed: loads 10 posts at a time, with "Load More" button
  - Only post creators can edit or delete their posts
  - Posts are tied to user accounts

- 👤 **User Profiles**

  - View and edit your profile: name, @username, bio, and profile picture
  - See all your posts on your profile page
  - Change or remove your profile picture

- 🔒 **Authentication & Authorization**

  - Register and log in with username/email and password
  - JWT-based authentication
  - Only authenticated users can create, edit, or delete posts
  - Profile editing is restricted to the owner

- 🖼️ **Image Uploads**

  - Upload images for posts and profile pictures
  - Image preview before upload

- ⚡ **Modern UI/UX**
  - Responsive, theme-matching design
  - Loading spinners for posts and profile sections
  - Clean, user-friendly navigation

### 🛠️ Coming Soon

- 💬 **Messaging System**: Direct messaging between users
- 📌 **Bookmarks**: Save your favorite posts to revisit later
- 🔔 **Notifications**: Real-time updates for interactions
- 🏷️ **Tag Filtering**: Browse posts by tags
- 🗂️ **User Search & Discovery**
- 📱 **Mobile App**

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Redux, FilePond, Axios
- **Backend**: Node.js, Express, Mongoose, Body-Parser, Cors, Dotenv, Nodemon, Winston (logging)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Token)

## 🧪 API Routes

| Method | Endpoint              | Description                                 |
| ------ | --------------------- | ------------------------------------------- |
| GET    | `/posts`              | Get paginated posts (`?page=1&limit=10`)    |
| GET    | `/posts/:id`          | Get a single post                           |
| POST   | `/posts`              | Create a new post (auth required)           |
| PATCH  | `/posts/:id`          | Update a post (auth + owner required)       |
| DELETE | `/posts/:id`          | Delete a post (auth + owner required)       |
| PATCH  | `/posts/:id/likePost` | Like a post (auth required)                 |
| POST   | `/users/signup`       | Register a new user                         |
| POST   | `/users/signin`       | Log in a user                               |
| PATCH  | `/users/:id`          | Update user profile (auth + owner required) |
| GET    | `/users/protected`    | Test protected route (auth required)        |

---

**Note:** Messaging, bookmarks, and notifications are planned for future releases.