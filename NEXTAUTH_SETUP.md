# NextAuth Setup with Supabase

This project is configured with NextAuth.js for authentication using Supabase as the backend. It supports both email/password and Google OAuth authentication.

## Features

- ✅ Email/Password authentication
- ✅ Google OAuth authentication (optional)
- ✅ User registration and login
- ✅ Protected routes with server-side authentication
- ✅ Client-side authentication hooks
- ✅ JWT session strategy
- ✅ Supabase integration

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-strong-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Google OAuth (Optional - remove these lines if not using Google OAuth)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# Database (for Prisma)
DATABASE_URL=your-database-url
```

### Generating NEXTAUTH_SECRET

You can generate a strong secret using:

```bash
openssl rand -base64 32
```

Or use an online generator for a 32-character random string.

## Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to Settings > API to get your project URL and keys
3. Enable Email authentication in Authentication > Providers
4. (Optional) Configure Google OAuth in Authentication > Providers

### Row Level Security (RLS)

Enable RLS on your tables and create policies using `auth.uid()`:

```sql
-- Example policy for a posts table
CREATE POLICY "Users can view their own posts" ON posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Google OAuth Setup (Optional)

1. Go to Google Cloud Console (https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
5. Set authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the Client ID and Client Secret to your `.env.local`

## Usage

### Server-Side Authentication

```typescript
import { requireAuth, getCurrentUser } from '@/lib/auth-utils'

// Protected page
export default async function ProtectedPage() {
  const session = await requireAuth() // Redirects to /auth if not authenticated
  return <div>Welcome {session.user.email}</div>
}

// Optional authentication check
export default async function OptionalAuthPage() {
  const user = await getCurrentUser() // Returns null if not authenticated
  return <div>{user ? `Welcome ${user.email}` : 'Please sign in'}</div>
}
```

### Client-Side Authentication

```typescript
import { useAuth } from '@/hooks/useAuth'

export default function MyComponent() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome {user?.email}</p>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : (
        <a href="/auth">Sign In</a>
      )}
    </div>
  )
}
```

### Sign In/Sign Out

```typescript
import { signIn, signOut } from 'next-auth/react'

// Email/password sign in
await signIn('credentials', {
  email: 'user@example.com',
  password: 'password',
  redirect: false,
})

// Google sign in
await signIn('google', { redirect: false })

// Sign out
await signOut({ redirect: false })
```

## API Routes

### Authentication API

- `GET/POST /api/auth/[...nextauth]` - NextAuth.js API routes
- `POST /api/auth/register` - User registration endpoint

### Registration Endpoint

```typescript
// POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password",
  "fullName": "John Doe"
}
```

## File Structure

```
src/
├── app/
│   ├── api/auth/
│   │   ├── [...nextauth]/route.ts    # NextAuth API routes
│   │   └── register/route.ts          # Registration endpoint
│   ├── auth/page.tsx                  # Authentication page
│   └── dashboard/page.tsx             # Protected page example
├── components/
│   ├── auth/
│   │   └── UserMenu.tsx              # User menu component
│   └── providers/
│       └── NextAuthProvider.tsx       # NextAuth provider
├── hooks/
│   └── useAuth.ts                    # Authentication hook
└── lib/
    ├── auth.ts                       # NextAuth configuration
    ├── auth-utils.ts                 # Server-side auth utilities
    └── supabase.ts                   # Supabase client
```

## Testing

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/auth`
3. Try registering a new user or signing in with existing credentials
4. Test Google OAuth (if configured)
5. Visit `/dashboard` to see protected content

## Troubleshooting

### Common Issues

1. **"Invalid email or password"** - Check Supabase authentication settings
2. **"client_id is required" error** - This means Google OAuth is not configured. Either:
   - Set up Google OAuth credentials and add them to `.env.local`, OR
   - Remove Google OAuth environment variables to disable it
3. **Google OAuth not working** - Verify redirect URIs in Google Cloud Console
4. **Session not persisting** - Check NEXTAUTH_SECRET and NEXTAUTH_URL
5. **CORS errors** - Ensure proper domain configuration in Supabase

### Debug Mode

Enable NextAuth debug mode by adding to your `.env.local`:

```env
NEXTAUTH_DEBUG=true
```

This will provide detailed logs for authentication issues.

## Security Considerations

1. Always use HTTPS in production
2. Keep your NEXTAUTH_SECRET secure and unique
3. Use environment variables for all sensitive data
4. Implement proper RLS policies in Supabase
5. Consider rate limiting for authentication endpoints
6. Regularly rotate API keys and secrets
