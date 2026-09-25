// The backend is now a separate deploy (Northflank), so every API call needs
// the full URL instead of a relative path like '/api/contact'.
//
// Vite only exposes environment variables to client code if they're prefixed
// with VITE_ — that's a Vite security rule, not a typo. Set VITE_API_URL in
// Vercel's project settings once the backend is deployed.
//
// Falls back to localhost:3000 so local dev works without any setup, as long
// as the backend (portfolio-backend) is also running locally on that port.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
