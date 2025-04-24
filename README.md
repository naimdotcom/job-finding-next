# 💼 job-finding-next

A modern, full-featured job board application built using **Next.js 15 (App Router)**, **TypeScript**, **MongoDB**, and **Shadcn UI**. This platform enables users to search, post, and apply to jobs with an intuitive experience similar to LinkedIn.

---

## ✨ Features

- 🔐 **Authentication**: Secure login/signup with JWT and cookies
- 🧑‍💼 **Role-based access**: Users can apply, and companies can post/manage jobs
- 📋 **Job Management**: Add, edit, delete, and view job listings
- 🏢 **Company Management**: Manage companies and their job postings
- 🔍 **Filtering & Pagination**: Filter by job type, salary, experience
- 🧭 **Shadcn + Tailwind UI**: Modern, clean, and fully responsive UI
- ⚙️ **API Routes**: Full RESTful API structure
- ⚡ **Server-side Middleware**: Route protection and token verification
- 🔁 **Caching**: In-memory cache for performance optimization (NodeCache)
- 📦 **Reusable Components**: Form inputs, job cards, modal, navbar, and more

---

## 🚀 Tech Stack

| Tech             | Purpose                             |
| ---------------- | ----------------------------------- |
| Next.js 15       | React framework for full-stack app  |
| TypeScript       | Type safety                         |
| MongoDB/Mongoose | Database & ODM                      |
| Shadcn UI        | Component library with Tailwind CSS |
| Axios            | HTTP client                         |
| bcryptjs         | Password hashing                    |
| JWT & Cookies    | Auth and session management         |
| Vercel           | Deployment                          |

---

## 🧪 Project Structure

    └── src/
        ├── app/ # App directory structure
        │   └── (routes)/ # API and Page routes
        ├── components/ # UI + Common Components
        ├── lib/ # Axios instance, date helpers, etc.
        ├── server/ # DB connection, models, middlewares
        ├── types/ # Shared TypeScript types
        └── utils/ # Utility functions

---

## 🖥️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/naimdotcom-job-finding-next.git
cd naimdotcom-job-finding-next
```

### 2. Install Dependencies

```
npm install
```

### 3. Set Up Environment Variables

Create a .env.local file and add the following:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the Development Server

```
npm run dev
```

Visit: http://localhost:3000

---

#### 🧑‍💻 Usage Example

    •	Go to /signup to create a new user
    •	Go to /company to create and manage your company
    •	Post jobs from your company profile
    •	View jobs at /jobs
    •	Click on a job to view full details and apply

---

#### 🔒 Authentication Flow

    1.	Users log in via /log-in
    2.	Token is stored in cookie (jobfindertoken)
    3.	Server middleware (src/middleware.ts) verifies the token
    4.	Protected routes are accessible only when authenticated

---

#### 📬 API Structure

Example API routes:

Method Endpoint Description
POST /api/auth/signup Register user
POST /api/auth/login Login user
GET /api/jobs Fetch all jobs
POST /api/jobs Create new job
GET /api/company/:id Company details + jobs
DELETE /api/jobs/:id Delete job

---

📦 Deployment

This project is optimized for deployment on Vercel.

---

#### 🧠 Credits

Made with ❤️ by Naim Islam

---

#### 📄 License

This project is licensed under the MIT License.

---

Let me know if you want a downloadable `.md` file or want to include screenshots/badges for GitHub display.
