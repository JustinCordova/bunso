# Frontend Documentation

## Project Structure

```
frontend/
├── src/
│   ├── actions/      # Redux actions
│   ├── api/          # API integration
│   ├── assets/       # Static assets
│   ├── components/   # Reusable components (Navbar, Post, Posts, PrivateRoute, etc.)
│   ├── constants/    # Constants and enums
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components (Home, Form, PostDetails, ProfilePage, AuthPage, EditPost)
│   ├── reducers/     # Redux reducers
│   └── App.jsx       # Main application component
```

## State Management

The application uses Redux for state management with the following structure:

- Actions: Define all possible state changes
- Reducers: Handle state updates
- Store: Central state container
- Posts are paginated and loaded in batches (10 at a time)

## Key Components

- `Navbar`: Main navigation with profile dropdown and sign out
- `Home`: Paginated post listing page with "Load More"
- `Form`: Post creation form
- `EditPost`: Post editing form
- `PostDetails`: Individual post view (with edit/delete for owner)
- `ProfilePage`: User profile with editable info and posts
- `AuthPage`: Login and registration (with profile picture upload)
- `PrivateRoute`: Protects routes for authenticated users only

## Authentication Flow

- Users can register (with profile picture) and log in
- JWT is stored in localStorage and sent with all API requests
- Only authenticated users can create, edit, or delete posts
- Only the profile owner can edit their profile
- Navbar shows sign out and profile options when logged in

## UI/UX Features

- Responsive, theme-matching design (Tailwind CSS)
- Loading spinners for posts and profile sections
- Image upload and preview for posts and profiles
- Clean, user-friendly navigation
- Edit Profile button is always visible at the top right of the profile page

## Setup and Installation

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Development Guidelines

### Component Structure

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types validation
- Implement error boundaries where necessary

### State Management

- Use Redux for global state
- Use local state for component-specific data
- Implement proper loading and error states
- Consider React Query/SWR for future server state caching

### Styling

- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Maintain consistent spacing and typography

### Performance

- Implement code splitting
- Use React.memo for expensive components
- Optimize images and assets
- Use paginated API calls for posts

### Styling

- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Maintain consistent spacing and typography

### Performance

- Implement proper code splitting
- Use React.memo for expensive components
- Optimize images and assets
- Implement proper caching strategies
