# Next.js + Better Auth + Prisma Starter

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app), using [Better Auth](https://www.npmjs.com/package/@better-auth/cli) for authentication and Prisma as the ORM.

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
```

````

### 2. Initialize Better Auth

```bash
npx @better-auth/cli@latest generate
````

This will scaffold the required authentication files into your project.

This creates the `prisma/schema.prisma` file

### 3. Migrate your database

Apply the Prisma schema to your database:

Ensure you have added a URL to your `DATABASE_URL` environment variable in your .env

```bash
npx prisma migrate dev --name init
```

This will create the necessary tables in your database.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## File Structure

You can start editing the app by modifying files in the `app/` directory. The page auto-updates as you edit.

Example route: `app/route.ts`

## Learn More

To learn more, check out the following:

- [Better Auth GitHub](https://github.com/better-auth/better-auth)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Learn Next.js](https://nextjs.org/learn)

## API Routes

This directory contains example API routes for the headless API app.

For more details, see [Next.js API routes](https://nextjs.org/docs/app/api-reference/file-conventions/route).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

Let me know if you also want environment variable setup examples included (`DATABASE_URL`, etc).
```
