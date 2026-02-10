#  Project Management App

A modern, scalable **Project Management Dashboard** built with **React 19**, **React Router v7 (App Router)**, **Redux Toolkit**, and **TailwindCSS v4**.  
A modern, scalable Project Management Dashboard built with React 19, React Router v7 (App Router), TailwindCSS v4, and Clerk Authentication. 
The project follows real-world production architecture, focusing on: 
 - UI-first development
 - Feature-based folder organization
 - Skeleton loaders for async UX
 - Clean separation of concerns
 - Accessibility and performance best practices

# Features Implemented (Detailed Overview)+

##  1. Application Architecture
- Fully configured **React Router v7 App Directory** (file-based routing)
- Modular & scalable **component architecture**
- Global **Layout system** (Navbar + Sidebar)
- Intelligent **layout hiding** for routes like `/login` and `404`
- Organized folder structure following industry-level best practices

## 2. Authentication (Frontend Setup)
- Integrated ClerkProvider at the app root
- Authentication handled fully by Clerk
- Supports:  
  - OAuth providers (Google-ready)  
  - Session-based auth
  - Secure route protection 

##  3. Dashboard Page (Home Screen)
The dashboard is composed of multiple independent widgets:
  - Stats Grid (animated with Framer Motion)
  - Project overview  
  - Recent activities  
  - Task summary  
Each widget:
 - Is built as an isolated component
 - Uses mock data for UI validation
 -  Is ready for backend integration
 - Avoids premature global state coupling

## 4. Skeleton Loaders 
Added highly polished skeleton loaders for:

- `StatsGridSkeleton`
- `ProjectOverviewSkeleton`
- `RecentActivitySkeleton`
- `TaskSummarySkeleton`

## 5. Animations & Micro-Interactions

- Smooth entrance animations for dashboard widgets using **Framer Motion**
- Staggered card animations in the StatsGrid
- Skeleton → content transitions for improved perceived performance
- Subtle hover micro-interactions for stat cards


Skeletons:
- Match final layout structure
- Use TailwindCSS animate-pulse
- Prevent layout shift
- Are easily replaceable with real loading states later

Performance Optimizations
- Dashboard sections are:
  - Lazy-loaded with React.lazy
  - Wrapped with Suspense
  - Memoized using memo()
  - Optimized re-renders and layout stability

##  5. UI System & Accessibility
###  Navbar
- Search bar  
- Light/Dark theme toggle  
- User avatar  
- Fully keyboard accessible  

###  Sidebar
- Desktop fixed version  
- Mobile slide-in version  
- Touch-friendly overlay  
- Click outside to close  
- Escape key support  
- ARIA role-based navigation 

## 6. Create Project Dialog (Optimized Modal)

Implemented a reusable **CreateProjectDialog** component for creating new projects.

- Lazy-loaded using React.lazy
- Conditionally mounted (renders only when opened)
- Memoized using React.memo to prevent unnecessary re-renders
- Controlled inputs for stable performance
- Fully accessible (focus trap, keyboard support, ARIA compliant)


- Dialog is lazy-loaded
- Dialog mounts only when opened
- Reduces initial bundle size
- Improves first paint
- Ensures smooth open/close animations



##  7. Error Handling
- Added **NotFound (404) Page**
- Automatically served for unknown routes
- Sidebar + Navbar are hidden on 404 page

---

#  Tech Stack

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
| **Auth** | Clerk |
| **Database (Upcoming)** | Neon PostgreSQL |

---

#  Folder Structure 

app/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── dashboard/
│   │   ├── StatsGrid.tsx
│   │   ├── StatsGridSkeleton.tsx
│   │   ├── TasksSummary.tsx
│   │   └── TasksSummarySkeleton.tsx
│   │
│   └── ui/
│       
│
├── routes/
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   └── NotFound.tsx
│
├── assets/
│   └── profile.svg
│
├── root.tsx
└── app.css
