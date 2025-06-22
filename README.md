````md
# Expo Starter Monorepo

Hi and welcome to the Expo Starter repo!  
I'm **Bailey Parker** (@bpthedev), and this is a minimal monorepo setup designed to help you move fast.

This repo contains three projects — a website, a mobile app, and a backend — managed together in a raw monorepo structure. Each project is committed from the root repo and deployed independently.

> 📹 A full documentation walkthrough video is coming soon.

This repo has been created as a template repo inside of GitHub, so to get started, simply click the "Use this template" button at the top right of the repo, and then just choose where you would like to create the repo.

---

## Structure

- `website/` – a Next.js web frontend
- `app/` – an Expo mobile app (deployed via EAS Build)
- `backend/` – a Next.js API backend with Better Auth + Prisma

Each project includes its own `.env.example` file to help you get your environment variables set up quickly.

---

## 🚀 Getting Started

Each project is self-contained. Here's a quick overview of how to get each one running.

---

### `website/`

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

#### Run locally:

```bash
cd website
npm install
npm run dev
````

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Deployment:

Deployed via [Vercel](https://vercel.com).

When deploying:

1. Go to [vercel.com](https://vercel.com) and select "Add New Project."
2. Choose this monorepo from your GitHub repositories.
3. Vercel will prompt you to pick which directory to deploy – select `website`.
4. Add the required environment variables (from `.env.example`).
5. Click **Deploy** – and you’re live.

---

### `app/`

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

#### Run locally:

```bash
cd app
npm install
npx expo start
```

Use the Expo Go app or run on simulators with `i` (iOS) or `a` (Android).

#### Deployment:

Deployed using [EAS Build](https://docs.expo.dev/eas/), Expo’s official cloud build service for generating binaries for iOS and Android.

---

### `backend/`

This is a [Next.js](https://nextjs.org) project using [Better Auth](https://www.npmjs.com/package/@better-auth/cli) and [Prisma](https://prisma.io).

#### Setup:

```bash
cd backend
npm install
npx @better-auth/cli@latest generate
```

Set up your `.env` from the provided `.env.example` file.

Then run:

```bash
npx prisma migrate dev --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the result.

#### Deployment:

Deployed via [Vercel](https://vercel.com).

When deploying:

1. Go to [vercel.com](https://vercel.com) and select "Add New Project."
2. Choose this monorepo from your GitHub repositories.
3. Vercel will prompt you to pick which directory to deploy – select `backend`.
4. Add the required environment variables (from `.env.example`).
5. Click **Deploy** – done!

---

## ✨ Deployment Summary

| App     | Stack                   | Deployment                |
| ------- | ----------------------- | ------------------------- |
| Website | Next.js                 | Vercel (select `website`) |
| App     | Expo                    | EAS Build                 |
| API     | Next.js + Auth + Prisma | Vercel (select `api`)     |

---

## 🛠 Environment Variables

Each repo contains a `.env.example` file with the required environment variables.
Copy it to `.env` and update the values for your local setup.

---

## 📺 Coming Soon

An in-depth video walkthrough covering how everything works, how to deploy, and how to extend the repo for production.

---

## Questions?

Feel free to email me - bailey@fluxinteractive.com.au or jump into the Discord - https://discord.gg/uaXYsGfpSG 

