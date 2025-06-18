# Backend Documentation

## Project Structure

```
backend/
├── controllers/  # Request handlers
├── models/       # Database models
├── routes/       # API routes
├── middleware/   # Auth, validation, rate limiting, logging
└── index.js      # Application entry point
```

## Database Schema

### User

- `name`: String
- `username`: String (unique)
- `email`: String (unique)
- `password`: String (hashed)
- `bio`: String
- `profilePicture`: String (base64 or URL)
- `createdAt`: Date

### Post

- `title`: String
- `body`: String
- `snippet`: String
- `tags`: [String]
- `selectedFile`: String (base64 image)
- `creatorId`: ObjectId (ref: User)
- `likeCount`: Number
- `comments`: [String]
- `published`: Boolean
- `slug`: String
- `createdAt`: Date

## Security

- CORS is configured to only allow requests from the frontend application
- Environment variables are used for sensitive configuration
- JWT authentication middleware protects sensitive routes
- Only post creators can edit/delete their posts
- Only users can edit their own profile
- Rate limiting and input validation are enforced

## Setup and Installation

1. Install dependencies:

```bash
cd backend
npm install
```

2. Configure environment variables:
   Create a `.env` file with:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
SECRET=your_jwt_secret
```

3. Start the server:

```bash
npm start
```

## Development Guidelines

### API Structure

- Follow RESTful principles
- Use proper HTTP methods
- Implement proper error handling
- Use middleware for common functionality

### Security Best Practices

- Validate all input data
- Implement rate limiting
- Use proper error messages
- Implement request logging
- Use secure headers

### Database

- Use proper indexing (e.g., on `createdAt`)
- Implement data validation
- Use transactions where necessary
- Implement proper error handling

### Performance

- Implement pagination for large datasets (see `/posts?page=1&limit=10`)
- Use compression for responses
- Store images efficiently (consider cloud storage for production)
