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

### Form System & Design Consistency (Global UI Enhancements)

Standardized form behavior across the entire application by customizing base shadcn/ui components.

Improvements include:

- Consistent labeled form layout for all dialogs
- Structured 2-column grid alignment for related fields
- Full-width selects for primary inputs (Lead, Members)
- Centralized Select dropdown styling with:
  - Blue hover state
  - Blue keyboard focus state
  - Accessible interactions
- Customized Input & Textarea focus styles:
  - Thin black border on focus
  - Removed default ring glow
  - Cleaner modern SaaS look
- Updated styles directly inside `/components/ui/*` to avoid repetition




## 6. Create Project Dialog 

Implemented a reusable **CreateProjectDialog** component for creating new projects.

Features:

- Lazy-loaded using React.lazy
- Conditionally mounted (renders only when opened)
- Memoized with React.memo to prevent unnecessary re-renders
- Structured labeled form layout
- 2-column responsive grid alignment
- Status & Priority selectors
- Start/End date inputs
- Project Lead and Team Members dropdowns
- Global Select hover/focus styling
- Consistent Input & Textarea focus behavior
- Fully accessible (focus trap, keyboard support, ARIA compliant)

Performance:
- Dialog mounts only when opened
- Reduces initial bundle size
- Improves first paint
- Ensures smooth open/close animations

## 7. Projects Module 

Implemented a fully responsive Projects module following feature-based architecture.
  ## Routing
- Added /projects route using React Router v7 file-based routing
- Integrated with global Layout (Navbar + Sidebar)
- Protected under Clerk authentication
  ## Projects Page (UI)
- Responsive layout 
- Header with contextual page description
- Gradient “New Project” action button
- Search input field (UI-ready)
- Status filter dropdown (shadcn Select)
- Priority filter dropdown (shadcn Select)
- Grid-based project layou
- Accessible semantic structure (<main>, <header>, <section>)
  ## ProjectCard Component
- Reusable and memoized
- Fully typed with strict TypeScript interfaces
- Status badge with dynamic color mapping
- Priority display
- Progress bar with ARIA attributes
- Accessible navigation via Link
- Responsive design and hover interactions



##  8. Error Handling
- Added **NotFound (404) Page**
- Automatically served for unknown routes
- Sidebar + Navbar are hidden on 404 page

## 9. Project Module Architecture (Nested Routing)
Implemented a scalable nested routing structure for project-level navigation.
# Dynamic Project Routing
The application now supports dynamic routes using:
/projects/:projectId

Each project contains nested sections:

/projects/:projectId/tasks
/projects/:projectId/analytics
/projects/:projectId/calendar
/projects/:projectId/settings

## Project Layout System
# Created a shared ProjectLayout component that:
- Uses useParams() to extract projectId
- Renders shared project header
- Provides tab-based navigation
- Uses <Outlet /> for nested rendering
- Avoids re-rendering full layout on tab switch
- Nested Routing Configuration
- Routes are structured using React Router v7 framework mode:
- Index route defaults to tasks
- Child routes render inside ProjectLayout
- Clean separation between layout and content

## Project Sidebar
- Built a dynamic ProjectSidebar component:
- Displays workspace projects
- Uses shadcn/ui Collapsible for expandable navigation
- Links to dynamic project routes
- Auto-expands active project based on URL
- Fully accessible and keyboard-friendly

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
