# Duolingo Clone

This repository contains a comprehensive eCommerce CMS built using modern web technologies. It includes both an admin interface for managing the store and a frontend store for customers.

## Features

- **Frontend**: Next.js, TypeScript, TailwindCSS, Zod, Zustand for a robust and scalable architecture.
- **Databse**: MySQL and Prisma for ORM
- **State Management**: Redux for managing application state.
- **HTTP Requests**: Axios
- **Admin Dashboard**: `ecommerce-admin`
- **Admin Dashboard**: `ecommerce-store`
- **Payments**: Stripe integration
- **Authentication**: Google SSO through Clerk

## Installation

1. **Clone the repository**
   ```bash
   https://github.com/RikhiSingh/ecommerceCMS.git
   
2. **Install Dependencies for individual packages**
   ```bash
   npm install
   
3. **Set up environment variables** <br/>
   Create a .env file in the root directory and add the necessary environment variables.
   *Namely*
   ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    CLERK_SECRET_KEY
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

    DATABASE_URL

    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

    STRIPE_API_KEY=

    FRONTEND_STORE_URL=http://localhost:3001

    STRIPE_WEBHOOK_SECRET

4. **Run the development server**
   ```bash
   npm run dev

5. **Access the Application** <br />
   Open http://localhost:3000 in your browser.

## Usage
- Admins can log in to manage products, orders, and users.
- Customers can browse products, add items to their cart, and complete purchases using Stripe.
  
## Contributing <br />
Contributions are welcome! Please follow these steps: <br />

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your branch.
5. Open a pull request.

<br />
This Markdown file provides a clear and styled README for your project. Feel free to further customize it as needed!
