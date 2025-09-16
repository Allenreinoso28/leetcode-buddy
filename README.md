# LeetNGreet

LeetNGreet Buddy is a social media–style platform for programmers to share their progress, approaches, and thoughts on LeetCode problems. Inspired by Twitter, it lets users post, follow, like, and comment while building a supportive coding community.

## 🎯 Project Goals

Create a community-driven space where people can post about LeetCode problems they’ve solved.

Allow users to share general thoughts/tips not tied to a specific problem.

Enable engagement through likes, comments, and following.

### Provide two feeds:

- General feed (all posts).

- Following feed (posts from people you follow).

## 🛠 Tech Stack

Frontend: Next.js (Dockerized for development, deployed on Vercel for production).

Backend: Next.js API routes (initially).

Database: MongoDB (local for dev, MongoDB Atlas for production).

Authentication: Auth0 (users stored in MongoDB).

## 👤 Users

Authenticated via Auth0.

Users stored in MongoDB.

Can follow/unfollow other users.

## 📝 Posts

### Two types of posts:

Problem-specific posts: tagged to a LeetCode problem.

General posts: like tweets, not tied to a problem.

### Posts support:

Likes 👍

Comments 💬

## 📖 LeetCode Problems (Tagging)

MVP will use a seeded problem list instead of scraping.

problems.json will store a set of common LeetCode problems, for example:
```
[
  { "id": 1, "title": "Two Sum", "slug": "two-sum", "difficulty": "Easy" },
  { "id": 2, "title": "Add Two Numbers", "slug": "add-two-numbers", "difficulty": "Medium" }
]
```

This JSON will be imported into a MongoDB collection during setup.

Future improvements: scraping LeetCode with Puppeteer, using Python scripts, or querying LeetCode’s unofficial GraphQL API.

## 📦 MVP Scope

### The minimum viable product will include:

- Auth0 authentication & user accounts.

- User profiles (basic).

- Ability to create posts (problem-specific or general).

- Likes and comments on posts.

- Following system.

- General feed and following feed.

- Seeded LeetCode problems for tagging.

## 🚀 Future Ideas

- Expand problem database via scraping or GraphQL API.

- Add hashtags (e.g., #DynamicProgramming, #Graphs).

- Code snippet support in posts.

- Leaderboards, notifications, and trending discussions.

## ⚙️ Setup Guide
### 1. Clone Repository
```
git clone https://github.com/allenreinoso28/leetcode-buddy.git
cd leetngreet
```

### 2. Install Dependencies
```
npm install
```

### 3. Environment Variables

Create a .env.local file with the following keys:
```
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret

MONGODB_URI=mongodb://localhost:27017/leetcodebuddy
```

### 4. Seed LeetCode Problems

Create a problems.json file (sample shown above). Then run a seed script:
```
npm run seed:problems
```

This will populate your MongoDB problems collection.

### 5. Run with Docker (Development)
```
docker compose build
```
```
docker compose up 
```
or 
```
docker compose watch
```

The app will start at http://localhost:3000.

### 6. Deploy (Production)

Frontend + API → Vercel

Database → MongoDB Atlas

Update environment variables in Vercel dashboard.
