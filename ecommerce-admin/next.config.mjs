/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "res.cloudinary.com",
        "openweathermap.org",
      ],
    },
    async headers() {
      return [
        {
          // Apply CORS headers to all routes for now
          source: '/(.*)',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: 'https://communocart-store.vercel.app',
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET, POST, OPTIONS',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'Content-Type',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  