# API Documentation

## Authentication Endpoints

### Register

```http
POST /users/signup
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "profilePicture": "base64string (optional)"
}
```

### Login

```http
POST /users/signin
Content-Type: application/json

{
  "identifier": "string (username or email)",
  "password": "string"
}
```

### Update Profile

```http
PATCH /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "string",
  "username": "string",
  "bio": "string",
  "profilePicture": "base64string (optional)"
}
```

## Post Endpoints

### Get Paginated Posts

```http
GET /posts?page=1&limit=10
Authorization: Bearer <token> (required for create/edit/delete)
```

Response:

```json
{
  "posts": [
    {
      "_id": "string",
      "title": "string",
      "body": "string",
      "snippet": "string",
      "tags": ["string"],
      "selectedFile": "string (base64 image)",
      "creatorId": { "_id": "string", "username": "string", "name": "string" },
      "createdAt": "date",
      ...
    }
  ],
  "total": 42
}
```

### Get Single Post

```http
GET /posts/:id
```

### Create Post

```http
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "body": "string",
  "tags": ["string"],
  "selectedFile": "base64string (optional)"
}
```

### Update Post

```http
PATCH /posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "body": "string",
  "tags": ["string"],
  "selectedFile": "base64string (optional)"
}
```

### Delete Post

```http
DELETE /posts/:id
Authorization: Bearer <token>
```

### Like Post

```http
PATCH /posts/:id/likePost
Authorization: Bearer <token>
```

---

**Notes:**

- All create, update, and delete operations require authentication (JWT in Authorization header).
- Only the post creator can edit or delete their post.
- Only the user can update their own profile.
- Images are sent as base64 strings; consider using URLs/cloud storage for production.
