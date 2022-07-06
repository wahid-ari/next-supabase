/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "i.scdn.co"],
  },
  env: {
    SUPABASE_URL: "https://dmkikqhgaiwprdgcvftb.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRta2lrcWhnYWl3cHJkZ2N2ZnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTcxMDIyMTAsImV4cCI6MTk3MjY3ODIxMH0.rZaJ7xkceVGl8Z--FLEP2VuLBAC9qze6QHQIdP14sBM"
  },
}

module.exports = nextConfig
