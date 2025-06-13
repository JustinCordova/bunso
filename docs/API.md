# API Documentation

## Authentication Endpoints

_Coming soon with authentication implementation_

## Post Endpoints

### Get All Posts

```http
GET /posts
```

Response:

```json
{
  "posts": [
    {
      "id": "string",
      "title": "string",
      "body": "string",
      "tags": ["string"],
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Get Single Post

```http
GET /posts/:id
```

Response:

```json
{
  "id": "string",
  "title": "string",
  "body": "string",
  "tags": ["string"],
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Create Post

```http
POST /posts
Content-Type: application/json

{
  "title": "string",
  "body": "string",
  "tags": ["string"]
}
```

### Update Post

```http
PATCH /posts/:id
Content-Type: application/json

{
  "title": "string",
  "body": "string",
  "tags": ["string"]
}
```

### Delete Post

```http
DELETE /posts/:id
```
