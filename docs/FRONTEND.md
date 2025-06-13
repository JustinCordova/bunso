# Frontend Documentation

## Project Structure
```
frontend/
├── src/
│   ├── actions/      # Redux actions
│   ├── api/          # API integration
│   ├── assets/       # Static assets
│   ├── components/   # Reusable components
│   ├── constants/    # Constants and enums
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   ├── reducers/     # Redux reducers
│   └── App.jsx       # Main application component
```

## State Management
The application uses Redux for state management with the following structure:
- Actions: Define all possible state changes
- Reducers: Handle state updates
- Store: Central state container

## Key Components
- `Navbar`: Main navigation component
- `Home`: Post listing page
- `Form`: Post creation/editing form
- `PostDetails`: Individual post view

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

### Styling
- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Maintain consistent spacing and typography

### Performance
- Implement proper code splitting
- Use React.memo for expensive components
- Optimize images and assets
- Implement proper caching strategies 