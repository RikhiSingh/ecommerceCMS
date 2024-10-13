Used following packages
1. Clerk (Authentication)
2. react
3. next
4. tailwind
5. zod
6. zadixUI
7. zustand
8. typescript
9. react-hook-form
10. prisma
11. PlanetScale
12. mongoDB atlas
13. axion
14. npm-hot-toast
15. MYSQL
16. cloudinary
17. next-coudinary
18. tanstack
19. react-tables,
20. date-fns
21. ShadCN

Estimate System Req (used by the app itself)
1. Database:
  - RAM: 500MB to 800MB
  - Last performance report: 
   - 95% efficiency 
    - Room for improvement ~1-2% 
   - 98% efficacy
    - Room for improvement ~0.2-0.3%
2. Storage Requirement:
  - Admin: 100MB - 600MB
  - Frontend: Staring from 100MB

On First Begin (required in .env)
- Create buffer store so can create new stores in future
1. Need account for Clerk secret key
2. database url MySQL/ PlanetScale (current models work for mysql type of databases only can be modified for mongo but not efficient (structurally))
  Then => any prisma.schema or the database itself change "npx prisma generate" and then "npx prisma db push"
3. Cloudinary cloud name
4. also need setting>upload>adduploadpreset>as unsigned
   Name from there required inside image-upload under uploadPreset
  NOTE: If mongo : Current IP Address not added. You will not be able to connect to databases from this address.

The app starts from from root and does validation on success goes to dashboard then storeId then its layout
and works comparatively same



for <code> <CommandItem> </code> you need "disablePointerEvents={true}" to make it selectable and opacity to 100 (command.tsx)

if public network you will get the error
<code>
Error: 
Invalid `prisma.store.findFirst()` invocation:



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
