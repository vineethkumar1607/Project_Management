#  Project Management App

A modern, scalable **Project Management Dashboard** built with **React 19**, **React Router v7 (App Router)**, **Redux Toolkit**, and **TailwindCSS v4**.  
A modern, scalable Project Management Dashboard built with React 19, React Router v7 (App Router), TailwindCSS v4, and Clerk Authentication. 
The project follows real-world production architecture, focusing on: 
 - UI-first development
 - Feature-based folder organization
 - Skeleton loaders for async UX
 - Clean separation of concerns
 - Accessibility and performance best practices

 This project is built in React Router v7 framework mode (file-based routing).
Routes must be defined inside app/routes.

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


### 10. Tasks Module (Data Table)
Implemented a scalable and extensible task management system inside each project.
## Tasks Routing
Tasks are rendered via nested routing under:
- /projects/:projectId
The default index route renders the Tasks module.

## Tasks Table Implementation
- Built using @tanstack/react-table v8
- Integrated with shadcn/ui Table components
- Fully typed using strict TypeScript generics
# Supports:
  - Column sorting
  - Custom cell rendering
  - Status badges
  - Priority formatting
  - Empty state handling
- Responsive container with horizontal scroll
- Accessible semantic table structure

## 11. Project Settings Module

Implemented a responsive and accessible Project Settings module under:


### Layout
- Replaced tab-based layout with responsive 2-column grid
- Left: General project configuration
- Right: Project members management
- Consistent bordered sections aligned with Tasks module UI
- Mobile-first responsive design

### General Settings
- Fully typed form using React Hook Form + Zod
- Editable fields:
  - Project Name
  - Description
  - Start & End Dates
  - Status
  - Priority
- Accessible labels and ARIA attributes
- Clean focus states aligned with global UI system

### Members Management
- Responsive member list
- Role display (Team Lead / Member)
- Change Role action
- Remove member action
- Improved mobile layout:
  - Stacked action buttons
  - Equal button width
  - Proper alignment
- Semantic structure using <section>, <ul>, and <li>

UI Improvements:
- Refined button alignment for better UX
- Improved spacing consistency
- Reduced visual imbalance in action buttons
- Fully responsive and accessible design
---



## 12. Project Calendar Module

Implemented a fully interactive and responsive Calendar module under:

/projects/:projectId/calendar

### Overview

The Calendar module provides a visual task scheduling interface within each project.  
It is built using **FullCalendar** and follows performance, scalability, and accessibility best practices.

### Calendar Features

- Monthly grid view (DayGridMonth)
- Custom day cell rendering
- Full-cell highlighting for task dates
- Dynamic task badge injection
- Date click → opens Task Modal
- Drag-and-drop support (UI-ready for backend integration)
- Responsive layout with sidebar integration
- Derived Upcoming & Overdue task panels
- Optimized event lookup using Map for constant-time access (O(1))

### Layout Structure

The Calendar page uses a responsive grid system:

- Desktop → 2/3 Calendar | 1/3 Sidebar (Upcoming & Overdue)
- Tablet → Stacked layout
- Mobile → Fully stacked vertical layout

Sidebar includes:

- Upcoming Tasks
- Overdue Tasks

Both sections:
- Use semantic `<section>` and `<ul>` structures
- Implement accessible `<time>` elements
- Follow consistent UI system styling
- Support keyboard navigation and focus states

### Performance Optimizations

- Events transformed using a custom `useCalendarEvents` hook
- Precomputed `Map` for constant-time date lookups
- Memoized derived state (upcoming & overdue tasks)
- Avoided repeated `.find()` operations inside calendar cells
- Local modal state (no unnecessary global state usage)

### Accessibility

- ARIA-labelled sections
- Semantic HTML structure
- Focus-visible styling
- Screen-reader friendly time elements
- Keyboard-accessible interactions

## 13. Project Analytics Module

Implemented a fully responsive and data-driven Analytics module under:

/projects/:projectId/analytics

### Overview

The Analytics module provides real-time project insights using visual KPIs and interactive charts.  
It transforms raw task data into meaningful performance metrics using memoized calculations and responsive visualizations.

Built with:

- Recharts (Bar & Pie charts)
- Lucide React (icons)
- TailwindCSS design system
- Semantic & accessible chart structures
- React.memo for render optimization

---

### Key Metrics (KPI Cards)

Displayed at the top of the page:

- Completion Rate (%)
- Active Tasks (IN_PROGRESS)
- Overdue Tasks
- Team Size

Each KPI:
- Uses a reusable `MetricCard` component
- Is memoized with React.memo
- Supports semantic structure using `<article>`
- Uses accessible ARIA labels
- Includes smooth hover micro-interactions

---

### Charts Implemented

#### 1. Tasks by Status (Bar Chart)

- Displays TODO, IN_PROGRESS, DONE counts
- Dynamic semantic color mapping
- No deprecated `<Cell>` usage
- Uses data-driven `fill` property
- Custom tooltip component
- Responsive via `ResponsiveContainer`
- Accessible via `<section>` + `<figure>` + `<figcaption>`

#### 2. Tasks by Type (Pie Chart)

- Displays distribution of task types (Feature, Bug, Improvement, etc.)
- Custom tooltip styling
- Animated transitions
- Legend support
- Fully responsive container
- Screen-reader friendly structure

#### 3. Priority Breakdown

- Calculates LOW / MEDIUM / HIGH distribution
- Displays percentage relative to total tasks
- Derived from memoized analytics logic
- Fully typed using strict TypeScript interfaces

---

### Data Processing & Performance

All analytics calculations are wrapped inside `useMemo()` to prevent unnecessary recalculations.

Derived values include:

- Total tasks
- Completed tasks
- In-progress tasks
- Overdue tasks
- Status distribution
- Type distribution
- Priority percentage breakdown

Benefits:

- Prevents redundant loops
- Ensures stable chart data
- Optimizes re-renders
- Keeps analytics computation isolated from UI

### Accessibility & Semantics

- Semantic `<main>`, `<section>`, `<header>`, `<article>` structure
- ARIA-labelled chart sections
- Screen-reader descriptions using `<figcaption class="sr-only">`
- Accessible tooltip contrast
- Keyboard-friendly UI structure
- Clear color contrast in charts

### Layout Structure

- Responsive KPI grid (1 → 2 → 4 columns)
- Two-column chart layout on large screens
- Stacked layout on mobile
- Consistent bordered container system (aligned with Tasks & Settings modules)
- Dark mode fully supported

### Architecture Highlights

- Reusable `MetricCard`, `StatusBarChart`, and `TypePieChart` components
- Strict TypeScript typing for analytics data models
- Clean separation between data processing and visualization
- Future-ready for backend integration


## 14. Team Module

Implemented a fully scalable and production-ready Team Management module.

Route:
- `/team`

### Overview

The Team module allows workspace-level team management with a consistent UI system aligned with the Projects module.

Built with:

- TanStack React Table v8
- shadcn/ui components
- Controlled dialog pattern
- Strict TypeScript typing
- Reusable StatsGrid integration

### Team Page Structure

The Team page includes:

- Header with primary CTA (Invite Member)
- Stats overview grid
- Search input for member filtering
- Sortable team data table

All sections follow semantic HTML structure using:

- `<main>`
- `<header>`
- `<section>`

### Team Statistics Grid

Reused the existing `StatsGrid` component from Dashboard.

Displays:

- Total Members
- Active Projects
- Total Tasks

Ensures:
- Component reuse
- Design consistency
- Avoided duplicate UI logic

### Team Table (TanStack Integration)

Implemented using:

- `@tanstack/react-table v8`
- `createColumnHelper`
- `getCoreRowModel`
- `getSortedRowModel`

Features:

- Sortable Name column
- Custom cell rendering
- Role-based badge color mapping
- Dynamic avatar color generation
- Empty state handling
- Fully typed column definitions
- Semantic and accessible table structure

#### Avatar Enhancements

- Deterministic avatar background colors
- Generated using character-based hashing
- Improves visual differentiation between users

#### Role Badge Styling

- Role-based color mapping using a scalable object pattern
- Avoided nested ternary conditions
- Easily extensible for additional roles

### Invite Member Dialog

Refactored to follow the same architecture pattern as CreateProjectDialog.

Improvements:
- Controlled dialog pattern (`open` + `onOpenChange`)
- Parent-managed state
- Memoized component using `React.memo`
- useCallback for submit handler
- Accessible form structure
- Role selector using shadcn Select
- Loading state handling
- DialogFooter consistency

Performance:
- Prevents unnecessary re-renders
- Keeps modal logic isolated
- Enables permission-based rendering in future

### UI Consistency Improvements

Standardized CTA button styling across:
- New Project
- Invite Member

Ensures:
- Consistent primary button design
- Shared visual identity
- Reduced styling duplication
- Scalable design-system alignment

### Search Functionality

Implemented client-side filtering:

- Filters members by name
- Case-insensitive matching
- Ready for debounce integration

### Architecture Highlights

- Feature-based modular design
- Clean separation of UI and logic
- Reusable data table pattern
- Type-safe role management
- Future-ready for backend integration

# API Integration & State Management
The application integrates with a backend service using a structured API layer and centralized state management.

## API Client Architecture
A reusable Axios client is configured to handle all API requests.

### Features:

* Centralized base URL configuration
* Automatic JSON headers
* Request interceptor for authentication token injection
* Scalable structure for all API modules

apiClient.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


## Authentication Flow (Clerk Integration)
Authentication is managed using Clerk.

### Flow:

1. Clerk provides `getToken()` via `useAuth()`
2. Token is stored globally using a setter function
3. Axios interceptor attaches token to every request

### Components:

* `AuthProvider`
* `authToken.ts`

This ensures all API requests are automatically authenticated.


## Workspace API Layer
A dedicated API module handles all workspace-related backend communication.

### Example:

export const workspaceApi = {
  getAll: async () => {
    const res = await apiClient.get("/api/workspace");
    return res.data.data;
  }
};

## Redux State Management
Redux Toolkit is used for global state management.

### Workspace Slice Features:

* Stores all user workspaces
* Maintains current workspace selection
* Persists workspace ID in localStorage
* Handles API loading and error states

### Async Thunks:

* `fetchWorkspaces` → fetches workspace data from backend
* `setWorkspaceWithPersistence` → syncs Redux + localStorage
* `deleteWorkspaceWithCleanup` → removes workspace safely

## Workspace Persistence Logic

The selected workspace is persisted using localStorage:

* Automatically restored on app reload
* Falls back to first available workspace if invalid
* Ensures consistent user experience across sessions

## Task State Management
A dedicated task slice is implemented for managing task data.

### Features:
* Add, update, delete tasks
* Store project-specific tasks
* Designed for future backend integration

## Type Safety
All API responses and state are strictly typed using TypeScript.

### Example:
export interface Workspace {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
}

This ensures:
* Safer API integration
* Better developer experience
* Fewer runtime errors

## Architecture Summary

Clerk Auth → Token → Axios Interceptor
        ↓
   API Layer (workspaceApi)
        ↓
   Redux Thunks
        ↓
   Redux Store (workspaceSlice)
        ↓
   UI Components

This layered architecture ensures:

* Clean separation of concerns
* Scalability
* Maintainability



## Workspace & Organization Management

Implemented a multi-tenant workspace system using Clerk Organizations integrated with Redux state.

### Workspace Dropdown

- Displays all available workspaces (organizations)
- Highlights the currently active workspace
- Allows seamless switching between workspaces
- Updates:
  - Clerk active organization (auth context)
  - Redux workspace state (UI context)
  - Application route (`/workspace/:workspaceId`)

### Organization Switching Flow

Workspace selection follows a synchronized flow:

1. Clerk `setActive()` updates the organization context
2. Redux updates the current workspace state
3. Application navigates to workspace-specific route

This ensures:
- Consistent auth context
- Correct API scoping
- UI state synchronization

### Create Workspace (Clerk Integration)

- Uses Clerk's `openCreateOrganization()` API
- Opens a fully managed modal (centered, responsive)
- Handles:
  - Organization creation
  - Validation
  - Closing interactions (ESC, outside click)

No custom modal implementation is required.

### State Synchronization

- Redux stores `currentWorkspaceId`
- `useEffect` ensures Clerk stays in sync with Redux
- Prevents mismatch between UI and auth context

### Persistence

- Workspace ID is persisted in localStorage
- Automatically restored on reload
- Falls back to a valid workspace if needed

### Architecture Insight

Clerk handles:
- Authentication
- Organization context

Redux handles:
- UI state
- Workspace selection

This separation ensures scalability and maintainability in a multi-tenant SaaS architecture.


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


