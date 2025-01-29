# Medium Blog

This project is a blog website similar to Medium, built with React for the frontend and Cloudflare Workers for the backend. It utilizes TypeScript, Prisma, PostgreSQL, and JWT for authentication.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setting Up Environment Variables](#setting-up-environment-variables)
  - [Running Locally](#running-locally)

---

## Technologies Used

### Frontend (To be added later):
- React
- TypeScript
- Tailwind CSS (for styling)
- React Icons
- React Toastify (for notifications)
- Zod (for validation)

### Backend:
- Cloudflare Workers
- TypeScript
- Prisma (ORM with connection pooling)
- PostgreSQL (as the database)
- JWT (for authentication)

---

## Features
- User authentication using JWT
- CRUD operations for blog posts
- Real-time updates powered by Cloudflare Workers
- Backend type validation using Zod

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **PostgreSQL** database

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Piyush5784/Medium-blog.git
   ```

2. **Navigate to the project directory:**
   ```sh
   cd medium
   ```

3. **Install dependencies (Frontend to be added later):**
   ```sh
   cd backend
   npm install  # or yarn install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```sh
   DATABASE_URL=your_postgres_database_url
   JWT_SECRET=your_jwt_secret
   ```

### Running Locally

Start the development server:
```sh
npm run dev
```

---

Now, you’re ready to build and explore the Medium Blog project! 🚀
