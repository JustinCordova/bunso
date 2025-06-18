# Bunso

**Bunso** is a modern blog and discussion platform that allows users to share posts, express opinions, and stay connected. It combines the simplicity of writing with the community features you'd expect from a social content app.

## Previews
<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between;">
  <img src="./assets/sample1.png" alt="Preview 1" style="width: 24%; border-radius: 8px;" />
  <img src="./assets/sample2.png" alt="Preview 2" style="width: 24%; border-radius: 8px;" />
  <img src="./assets/sample3.png" alt="Preview 3" style="width: 24%; border-radius: 8px;" />
  <div style="width: 24%;"></div> <!-- optional filler if only 3 images -->
</div>

## 🚀 Features

- 📄 **Post Creation**
  - Create posts with a **title**, **body**, and **tags**
  - Upload **images** to visually enhance your content

- 💬 **Messaging System**
  - Direct messaging between users
  - Simple and responsive UI for communication

- 📌 **Bookmarks**
  - Save your favorite posts to revisit later

- 🔔 **Notifications**
  - Get real-time updates for interactions like messages or post activity

- 👤 **User Profiles**
  - View and edit your personal information
  - Display all your posts and bookmarks in one place

## 🛠️ Tech Stack

- **Frontend**: React.js (vite), Tailwind CSS, Redux, FilePond, Axios
- **Backend**: Node.js, Express, Mongoose, Body-Parser, Cors, Dotenv, Nodemon
- **Database**: MongoDB (via Mongoose)
- **Authentication**: Coming soon

## 🧪 Sample API Routes

| Method | Endpoint            | Description               |
|--------|---------------------|---------------------------|
| GET    | `/posts`            | Get all posts             |
| GET    | `/posts/:id`        | Get a single post         |
| POST   | `/posts`            | Create a new post         |
| PATCH  | `/posts/:id`        | Update a post             |
| DELETE | `/posts/:id`        | Delete a post             |