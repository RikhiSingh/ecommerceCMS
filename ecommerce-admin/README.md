Used ClerkUI, react, next, tailwind, zod, zadixUI, zustand, typescript, react-hook-form, prisma, PlanetScale, mongoDB atlas, axion, npm-hot-toast, MYSQL, cloudinary, next-coudinary, tanstack, react-tables

cuurently starts fro root and does validation on success goes to dashboard then storeId then its layout

after clearing db npx prisma generate
npx prisma db push

for <code> <CommandItem> </code> you need "disablePointerEvents={true}" to make it selectable and opacity to 100 (command.tsx)

if public network you will get the error
<code>
Error: 
Invalid `prisma.store.findFirst()` invocation:

have signed upload from setting from cloudify in image-upload under uploadPreset


Error in connector: Error creating a database connection. (Kind: An error occurred during DNS resolution: proto error: io error: A socket operation was attempted to an unreachable network. (os error 10051), labels: {})

Source
app\(root)\layout.tsx (17:18) @ async SetupLayout

  15 |
  16 |     // load first store available
> 17 |     const store= await prismadb.store.findFirst({
     |                  ^
  18 |         where:{
  19 |             userId
  20 |         }
  </code>

Current IP Address not added. You will not be able to connect to databases from this address.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
