// lib/init-middleware.js
import Cors from 'cors';

// Helper method to initialize middleware
export function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

// Configure CORS middleware to allow requests from http://localhost:3001
export const cors = initMiddleware(
  Cors({
    origin: 'http://localhost:3001', // Allow only localhost:3001
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
