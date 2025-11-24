# 🧩 Project Management App

A modern, scalable **Project Management Dashboard** built with **React 19**, **React Router v7 (App Router)**, **Redux Toolkit**, and **TailwindCSS v4**.  
This project follows real-world production architecture, featuring responsive layouts, lazy-loaded components, OAuth-ready authentication, skeleton loaders, and clean code principles adopted by senior engineers.

---

# 🚀 Features Implemented (Detailed Overview)

## ⭐ 1. Application Architecture
- Fully configured **React Router v7 App Directory** (file-based routing)
- Modular & scalable **component architecture**
- Global **Layout system** (Navbar + Sidebar)
- Intelligent **layout hiding** for routes like `/login` and `404`
- Organized folder structure following industry-level best practices

## ⭐ 2. Authentication (Frontend Setup)
- OAuth-ready **Login Page UI** using shadcn/ui
- “Continue with Google” button (awaiting backend integration)
- Built **auth slice** with Redux Toolkit  
  - `loginSuccess()`  
  - `logout()`  
  - `localStorage` persistence  
- Created **ProtectedRoute** component
  - Blocks unauthorized access  
  - Redirects user to `/login` if not logged in

## ⭐ 3. Dashboard Page (Home Screen)
- Semantic, responsive, accessible layout  
- Split into multiple sections:
  - Stats overview  
  - Project overview  
  - Recent activities  
  - Task summary  
- All dashboard sections:
  - **Lazy-loaded** with `React.lazy()`
  - Wrapped with **Suspense**
  - Wrapped with **memo()** for performance

## ⭐ 4. Skeleton Loaders (Production Standard)
Added highly polished skeleton loaders for:

- `StatsGridSkeleton`
- `ProjectOverviewSkeleton`
- `RecentActivitySkeleton`
- `TaskSummarySkeleton`

All built using TailwindCSS animations and WCAG-accessible placeholders.

## ⭐ 5. UI System & Accessibility
### ✨ Navbar
- Search bar  
- Light/Dark theme toggle  
- User avatar  
- Fully keyboard accessible  

### ✨ Sidebar
- Desktop fixed version  
- Mobile slide-in version  
- Touch-friendly overlay  
- Click outside to close  
- Escape key support  
- ARIA role-based navigation  

## ⭐ 6. Error Handling
- Added **NotFound (404) Page**
- Automatically served for unknown routes
- Sidebar + Navbar are hidden on 404 page

---

# 🏗️ Tech Stack

| Area | Technology |
|------|------------|
| **Language** | TypeScript |
| **Framework** | React 19 |
| **Router** | React Router v7 (App Router) |
| **State Management** | Redux Toolkit |
| **Styles** | TailwindCSS v4 |
| **UI Components** | shadcn/ui |
| **Icons** | Lucide React |
| **Bundler** | Vite |
| **Auth (Upcoming)** | Google OAuth (Express + Passport) |
| **Database (Upcoming)** | Neon PostgreSQL |

---

# 📂 Folder Structure (Production Standard)

app/
├── components/
│ ├── Navbar.tsx
│ ├── Sidebar.tsx
│ └── ui/ (shadcn components + skeletons)
│
├── routes/
│ ├── Dashboard.tsx
│ ├── Login.tsx
│ ├── NotFound.tsx
│ └── routes.ts (React Router file-based config)
│
├── store/
│ ├── authSlice.ts
│ └── store.ts
│
├── assets/
│ └── profile.svg
│
├── root.tsx
└── app.css