#  Project Management App

A modern, scalable **Project Management Dashboard** built with **React 19**, **React Router v7 (App Router)**, **Redux Toolkit**, and **TailwindCSS v4**  and **Clerk Authentication**. 

## Key Highlights

- SaaS architecture
- Feature-based scalable folder structure
- Advanced task management (selection + bulk actions + role-based access)
- Optimistic UI with rollback handling
- RTK Query integration with caching and invalidation
- Multi-workspace support with Clerk Organizations
- Real-time-like UX with optimistic updates and infinite scrolling
- Fully responsive and accessible UI system

The project is designed with a scalable frontend architecture, focusing on:

- UI-first development
- Feature-based folder organization
- Skeleton loaders for improved async user experience
- Clear separation of concerns
- Accessibility and performance best practices

The application is built using React Router v7 in framework mode (file-based routing).  
All routes are defined within the `app/routes` directory.

# Tech Stack

| Area | Technology |
|------|------------|
| Language | TypeScript |
| Framework | React 19 |
| Router | React Router v7 (App Router) |
| State Management | Redux Toolkit |
| Data Fetching | RTK Query |
| Styling | TailwindCSS v4 |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Charts | Recharts |
| Calendar | FullCalendar |
| Authentication | Clerk |
| HTTP Client | Axios |
| Build Tool | Vite |

# Features Implemented (Detailed Overview)

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
 - Uses real backend data via Redux Toolkit and API integration
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

## 6. UI System & Accessibility
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

## 7. Theme System & Dark Mode Architecture
Implemented a fully consistent and production-ready theming system across the application.

### Overview
The application now uses a simplified and reliable theme architecture that ensures:
- Persistent theme across sessions
- No UI flicker during hydration
- Consistent styling across all components and third-party libraries
- Unified dark mode experience

### Theme Persistence
- Theme is stored in `localStorage`
- Restored on application load
- Prevents theme reset on refresh

### Hydration Fix (No Flash Issue)
- Introduced a pre-hydration script to apply theme before React mounts
- Eliminates flash of incorrect theme 

### Theme Initialization
- Added `ThemeInitializer` component
- Syncs theme before app render
- Ensures correct theme is applied immediately

### Simplified Theme Logic
- Removed system-based theme detection
- Only supports:
  - Light mode
  - Dark mode
- Results in:
  - Predictable UI behavior
  - Reduced complexity

### Clerk UI Theme Synchronization
- Clerk components now follow application theme
- Ensures:
  - Consistent authentication UI
  - No mismatch between app and auth components

### FullCalendar Dark Mode Support
Extended dark mode support for FullCalendar:
- Header styling
- Toolbar buttons
- Date cells
- Borders and background
- Event badge contrast

### Component-Level Dark Mode Enhancements
Updated the following components to fully support dark mode:
- ProjectCalendar
- UpcomingTasks
- OverdueTasks
- ProjectLayout tabs

Improvements include:
- Better contrast ratios
- Accessible color tokens
- Consistent background and border styling

### UI Consistency Improvements
- Unified color tokens across light and dark modes
- Improved task badge readability
- Consistent borders and surfaces across modules

### Result
- No hydration flicker
- Fully consistent dark mode experience
- Production-ready theming system

## 8. Create Project Dialog 
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

### Backend Integration
- Integrated with Redux Toolkit (`createProject` thunk)
- Uses React Hook Form for form handling
- Transforms frontend payload to backend schema
- Displays loading and success states using toast notifications
- Fetches workspace members dynamically from backend

### Form Handling & Validation
- Integrated React Hook Form for efficient and scalable form state management
- Handles:
  - Input binding
  - Validation-ready structure
  - Controlled form submission
- Improves performance by minimizing re-renders compared to traditional state handling

### Workspace Member Selection
- Dynamically fetches workspace members from backend
- Supports:
  - Project Lead selection (single)
  - Team Members selection (multiple)
- Ensures:
  - Only valid workspace users can be assigned
  - Consistent relationship mapping with backend

### Payload Transformation
Form data is transformed before sending to backend:
- Converts UI-friendly inputs into backend-compatible structure
- Ensures correct field naming and formatting

Example:

Frontend:
- team_lead → email
- team_members → array of emails

Backend:
- Maps emails → user IDs
- Stores relational data

### User Feedback & UX
- Integrated toast notifications for:
  - Success (project created)
  - Error (API failure)
- Provides immediate feedback to users
- Improves perceived responsiveness

### Redux Integration
- Connected UI with `createProject` async thunk
- Flow:

Form Submit → Dispatch Thunk → API → Redux Store → UI Update

- Automatically updates project list after creation
- Eliminates need for manual refresh

### Payload Structure
The form transforms data before sending:

{
  name,
  description,
  status,
  priority,
  start_date,
  end_date,
  team_lead,
  team_members
}

Ensures compatibility with backend API expectations.

## 9. Projects Module 
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
- Grid-based project layout
- Accessible semantic structure (<main>, <header>, <section>)
  ## ProjectCard Component
- Reusable and memoized
- Fully typed with strict TypeScript interfaces
- Status badge with dynamic color mapping
- Priority display
- Progress bar with ARIA attributes
- Accessible navigation via Link
- Responsive design and hover interactions


### Backend Integration
- Replaced mock data with Redux store (`projectSlice`)
- Projects are fetched from backend and stored centrally
- Dashboard and Projects module share the same data source
- Ensures single source of truth across the application
- UI updates automatically when new project is created
- Eliminates need for manual refresh

### Data Flow Integration
- Projects data is sourced from centralized Redux state
- Dashboard and Projects page consume shared data
- Prevents duplicate API calls and inconsistent state

Flow:

API → Redux Store → Dashboard / Projects UI

Benefits:

- Consistent data across modules
- Reduced network requests
- Predictable state management

### Client-Side Filtering

Implemented dynamic filtering for Projects:
- Search by project name
- Filter by status
- Filter by priority

Features:
- Instant filtering (no API calls)
- Case-insensitive search
- Combined filter support

Benefits:
- Fast user interaction
- Reduced backend dependency
- Improved UX

### UI States Handling

Implemented robust UI state handling:
- Loading state:
  - Reused `ProjectOverviewSkeleton`
- Empty state:
  - Displays when no projects match filters or data is empty
- Error state:
  - Displays fallback UI on API failure

Benefits:
- Clear user feedback
- Consistent UX patterns
- Improved perceived reliability

### Type Safety Improvements
- Ensured consistent `Project` type usage across components
- Removed unsafe `any` usage
- Handled nullable fields (e.g., description) safely

Benefits:
- Improved developer experience
- Reduced runtime errors
- Stronger type guarantees across UI

### UI Refinement
- Cleaned up UI implementation without altering existing design
- Maintained visual consistency while improving internal structure
- Ensured responsive behavior across screen sizes

### State Flow
Component → Dispatch Thunk → API → Redux Store → UI
Ensures:
- Single source of truth
- Predictable state updates
- Scalable architecture

##  10. Error Handling
- Added **NotFound (404) Page**
- Automatically served for unknown routes
- Sidebar + Navbar are hidden on 404 page

## 11. Project Module Architecture (Nested Routing)
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


### 12. Tasks Module (Data Table)
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

### Task Interaction System (Status + Selection + Bulk Actions)
### Overview
Enhanced the task table UI and implemented a robust status update workflow with confirmation handling, optimistic updates, and role-based access control.

This ensures controlled task state transitions, improved UX, and production-ready interaction patterns.

### UI Improvements
- Applied `table-fixed` layout for consistent column widths
- Standardized and center-aligned status dropdown UI
- Improved type badge alignment for cleaner visual structure

Benefits:
- Ensures consistent table layout across screen sizes
- Improves readability and visual hierarchy
- Provides a more polished and professional UI

### Role-Based Access Control
- Integrated Clerk `useUser` hook to identify current user
- Implemented permission logic:
  - **Team Lead** → full access
  - **Assignee** → can update task status
  - **Other members** → read-only access
- Disabled status dropdown for unauthorized users

Benefits:
- Enforces correct access control at UI level
- Prevents unauthorized updates
- Aligns frontend behavior with backend permissions

### UX Enhancements
- Prevented row navigation when interacting with dropdown using `stopPropagation`
- Prevented redundant updates when selecting the same status
- Disabled dropdown during API request

Benefits:
- Avoids accidental navigation
- Reduces unnecessary API calls
- Improves interaction reliability

### Status Update Workflow
- Integrated `updateTask` mutation using RTK Query
- Added confirmation dialog before status change
- Implemented optimistic UI updates for instant feedback
- Added rollback mechanism on API failure
- Integrated toast notifications for success and error states

Benefits:
- Provides immediate visual feedback
- Ensures data consistency with rollback handling
- Improves overall user confidence in interactions

### Type Safety Improvements
- Extended `Task` type to include:
  - `project.team_lead`
  - `assignee.id`
- Enabled accurate permission checks based on task ownership and project role

Benefits:
- Strengthens type safety across components
- Prevents incorrect permission evaluation
- Improves maintainability of access logic

### Result
- Consistent and polished task table UI
- Secure and role-aware task updates
- Optimistic and responsive user experience
- Stable and production-ready interaction flow

### Task Selection & Bulk Actions System
### Overview
Introduced a complete task selection system with bulk delete functionality, enhancing user control, efficiency, and overall interaction experience within the task table.

### Selection Features
- Checkbox-based task selection (single & multi-select)
- Shift-click range selection (Gmail/Jira-style)
- "Select All" and "Deselect All" functionality

Benefits:
- Enables efficient batch operations on tasks
- Improves productivity for large task lists
- Matches familiar UX patterns used in modern applications

### Bulk Actions
- Implemented bulk delete action for selected tasks
- Added confirmation dialog before deletion
- Conditional rendering of delete button based on selection state
- Positioned action controls alongside filter bar for better UX

Benefits:
- Prevents accidental destructive actions
- Keeps UI clean and context-aware
- Improves discoverability of bulk actions

### UX Enhancements
- Prevented row navigation when interacting with checkboxes using `stopPropagation`
- Ensured consistent interaction behavior across table actions
- Responsive layout with action controls aligned beside filters

Benefits:
- Eliminates accidental navigation issues
- Provides predictable interaction patterns
- Improves usability across different screen sizes

### Refactoring & Architecture
Extracted logic into reusable hooks:
- `useTaskSelection`
- `useDeleteTasksHandler`

Responsibilities:
- `useTaskSelection`:
  - Handles selection state
  - Manages range selection logic
  - Controls select-all behavior
- `useDeleteTasksHandler`:
  - Handles delete mutation
  - Manages confirmation flow
  - Coordinates UI state during deletion

Benefits:
- Clear separation of concerns (UI vs logic)
- Improved code reusability
- Easier testing and maintenance

### API Integration
- Integrated RTK Query mutation for bulk delete
- Implemented proper cache invalidation for task list updates

Benefits:
- Ensures UI stays in sync with backend
- Eliminates need for manual refetching
- Maintains consistent data state

### Cleanup & Stability Improvements
- Removed undo/restore functionality to simplify flow
- Eliminated unused state and redundant logic
- Streamlined delete workflow for reliability

Benefits:
- Reduced complexity
- Improved maintainability
- More predictable behavior

### Tested Scenarios
- Single task selection and deletion
- Multiple task selection and deletion
- Shift range selection
- Select all / deselect all
- Checkbox interaction without navigation issues
- API success and failure handling

### Result
- Efficient bulk task management system
- Scalable and reusable selection architecture
- Improved UX with familiar interaction patterns
- Stable and production-ready implementation

## 13. Project Settings Module
Provides full project configuration and team management with real-time updates and optimized state handling.
Implemented a responsive and accessible Project Settings module under:

### Layout
- Replaced tab-based layout with responsive 2-column grid
- Left: General project configuration
- Right: Project members management
- Consistent bordered sections aligned with Tasks module UI
- Mobile-first responsive design

### General Settings
- Built using React Hook Form + Zod for validation
- Form is prefilled using project data from Redux store
- Supports editing:
  - Project Name
  - Description
  - Start & End Dates
  - Status
  - Priority

Features:
- Schema-based validation (Zod)
- Dirty state tracking for controlled submission
- Loading and submit state handling
- Dynamic progress calculation based on project data
- Accessible labels and ARIA attributes
- Consistent UI using shadcn components

Benefits:
- Scalable form architecture
- Strong validation guarantees
- Improved user experience

### Project Update Integration
- Integrated update API using Redux Toolkit async thunk
- Uses PUT method (temporary workaround for PATCH CORS issue)
- Supports controlled partial updates via form submission

Flow:
Form Submit → Dispatch Thunk → API → Redux Store → UI Update

Features:
- Loading state handling during update
- Toast notifications for success/error feedback
- Immediate UI update without refetch

Benefits:
- Smooth UX
- Reduced API calls
- Consistent data synchronization

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

### Add Member Flow
- Allows adding members from existing workspace members
- Integrated with backend via Redux thunk

Flow:

Select Member → Convert (memberId → email) → API Call → Redux Update

Features:
- Member selection dialog
- Async handling via Redux Toolkit
- Toast notifications for feedback
- Prevents duplicate member addition

Optimization:
- Updates Redux state directly after API call
- Avoids full project refetch

Benefits:
- Faster UI updates
- Reduced network overhead
- Better user experience

### State Management
- Uses Redux Toolkit for:
  - Project data
  - Project updates
  - Member addition

Optimizations:
- Direct state updates instead of refetching
- Derived state using `useMemo` for filtering available members

Benefits:
- Efficient rendering
- Reduced API calls
- Scalable architecture

### Fixes & Improvements
- Fixed double scrollbar issue by replacing `h-screen` with `min-h-screen`
- Improved form UX and validation flow
- Handled PATCH CORS issue by switching to PUT method
- Ensured consistent API integration patterns

### Testing
Verified:
- Project settings UI rendering
- Form prefill and validation
- Project update flow (PUT)
- Member addition flow end-to-end
- Redux updates without unnecessary API refetch


### Member Management (Add & Remove with Optimistic Updates)
Implemented a complete member lifecycle system with optimistic UI updates and rollback handling.

#### Add Member (Optimistic Flow)
- Temporarily inserts member into UI before API response
- Provides instant feedback to user
- Rolls back state if API request fails

#### Remove Member (Optimistic Flow)

- Immediately removes member from UI
- Confirms deletion via dialog before API call
- Restores member if API request fails

#### Rollback Handling
- Implemented using rejected async thunk cases
- Ensures UI consistency on API failure

Benefits:
- Zero waiting UX
- Feels real-time and responsive
- Maintains data integrity

### Defensive UI & Validation
Implemented multiple safeguards to prevent invalid operations:
- Prevents duplicate member addition
- Disables actions during async operations
- Protects project team lead from being removed
- Ensures dialog closes only on successful API response

Benefits:
- Prevents user errors
- Improves reliability
- Aligns with production UX standards

### Data Consistency & Mapping Fixes
Resolved inconsistencies between workspace members and project members data structures.

Fixes:
- Normalized structure differences (flat vs nested user object)
- Standardized usage of `user.id` across comparisons
- Fixed filtering and mapping logic

Impact:
- Eliminated incorrect filtering issues
- Ensured accurate member selection and removal
- Improved maintainability of data layer

### Runtime Safety Improvements
- Added null/undefined guards for nested objects (`user`, `members`)
- Prevented crashes caused by unsafe property access
- Ensured safe filtering and mapping logic

Benefits:
- Increased application stability
- Prevented runtime errors in edge cases

### UX Enhancements
- Immediate dialog close on successful add action
- Proper loading indicators for async operations
- Consistent toast notifications for success and error states
- Improved dropdown behavior:
  - Removed members reappear correctly
  - Handles empty states gracefully

Benefits:
- Smooth and predictable user experience
- Clear feedback for all actions

### Architecture Highlights
- Optimistic UI pattern for async operations
- Rollback handling using Redux rejected cases
- Separation of confirmation dialog into reusable component
- Cleaned up debug logs for production readiness
- Fixed invalid JSX and conditional rendering issues

This follows production-grade frontend patterns:
- Async-safe state management
- Defensive UI design
- Consistent Redux synchronization

## 14. Project Calendar Module

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

Sidebar includes-
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

## 15. Project Analytics Module
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
- Fully integrated with global theme system using consistent design tokens

### Architecture Highlights
- Reusable `MetricCard`, `StatusBarChart`, and `TypePieChart` components
- Strict TypeScript typing for analytics data models
- Clean separation between data processing and visualization
- Future-ready for backend integration

### Analytics Data Integration & Stability Improvements
### Overview

Refactored the Project Analytics module from a mock-based implementation to a fully API-driven system, while resolving critical issues related to project context, rendering stability, and workspace member data handling.

This ensures the analytics feature is accurate, stable, and production-ready.

### Analytics Data Integration
- Removed mock data usage from `ProjectAnalytics`
- Integrated real task data using RTK Query
- Derived analytics metrics dynamically from API response
- Refactored KPI rendering to use configuration-based mapping instead of hardcoded values

Benefits:
- Ensures analytics reflect real backend data
- Improves scalability of KPI rendering
- Eliminates duplication and hardcoded logic

### Analytics Performance & UX Optimizations
### Overview
Enhanced the Project Analytics module by improving performance, user experience, and scalability through optimized data handling, reusable abstractions, and navigation improvements.

### Performance Optimizations
- Refactored analytics logic into a reusable `useAnalytics` hook
- Introduced in-memory caching to avoid redundant computations
- Optimized chart datasets by limiting and grouping data

Benefits:
- Eliminates repeated calculations across renders
- Reduces computational overhead for large datasets
- Improves chart rendering efficiency

### Reusable Analytics Hook
- Extracted all analytics computation logic into `useAnalytics`
- Centralized:
  - KPI calculations
  - Chart data transformation
  - Derived metrics

Benefits:
- Clear separation of concerns (logic vs UI)
- Improved reusability across components
- Easier testing and future enhancements

### Chart Rendering Optimization
- Reduced dataset size by grouping less significant values
- Limited excessive data points in charts

Benefits:
- Prevents performance degradation with large datasets
- Improves readability of visualizations
- Ensures smoother rendering in Recharts

### UX Enhancements
- Introduced route-based skeleton loaders for analytics page
- Replaced basic loading states with structured skeleton UI
- Implemented route prefetching on tab hover

Benefits:
- Improves perceived performance during navigation
- Reduces waiting time between tab transitions
- Provides consistent loading experience across modules

### Navigation Optimization
- Enabled route prefetching for analytics tab
- Loads analytics resources before user navigation

Benefits:
- Faster page transitions
- Reduced loading delays
- Improved overall responsiveness

### Result
- Reduced unnecessary re-renders and computations
- Faster and smoother chart rendering
- Improved navigation experience with prefetching
- Cleaner and scalable analytics architecture

### Project Context Handling
- Fixed issue where `projectId` was undefined on page refresh
- Prevented invalid API calls caused by missing project context
- Added conditional query execution using `skip`

Benefits:
- Avoids unnecessary or broken API requests
- Ensures correct data fetching lifecycle
- Improves reliability during page reload and navigation

### Infinite Render Loop Fix
- Resolved "maximum update depth exceeded" error
- Fixed improper `useEffect` dependency usage
- Updated project fetching logic to prevent redundant dispatch calls

Benefits:
- Eliminates unnecessary re-renders
- Stabilizes component lifecycle
- Improves overall performance

### Members Data Handling Fix
- Fixed members dropdown not populating in `CreateTaskDialog`
- Replaced direct Redux selector usage with reusable `useWorkspaceMembers` hook
- Ensured members are fetched based on active workspace context
- Added proper loading state handling

Benefits:
- Ensures correct workspace-scoped member data
- Improves data consistency across components
- Enhances user experience with proper loading feedback

### Technical Improvements
- Analytics calculations optimized using `useMemo`
- Standardized API-driven data flow across analytics components
- Added defensive checks for missing `projectId` and `workspaceId`
- Improved separation of concerns using reusable hooks

Benefits:
- Prevents runtime errors
- Improves maintainability and readability
- Ensures consistent and predictable data flow

### Testing & Validation
- Verified analytics rendering with real task data
- Tested page refresh scenarios for project context handling
- Validated members dropdown population and selection
- Confirmed resolution of infinite re-render issues
- Ensured no invalid or duplicate API calls are triggered

### Result
- Fully API-driven analytics system
- Stable rendering with no infinite loops
- Accurate project-scoped data handling
- Improved performance and maintainability

## 16. Team Module
### Overview
The Team module allows workspace-level team management with a consistent UI system aligned with the Projects module.

Built with:
- TanStack React Table v8
- shadcn/ui components
- Controlled dialog pattern
- Strict TypeScript typing
- Reusable StatsGrid integration

### Team Page Structure
Implemented a fully scalable and production-ready Team Management module.

### Team System Refactor & Design Standardization
Refactored the Team module into a fully backend-driven and reusable system, while establishing consistent UI and data patterns across the application.

### Backend-Driven Member System
- Replaced Clerk-based member fetching with database-driven workspace members API
- Integrated `fetchWorkspaceMembers` thunk for centralized data handling
- Enabled role-based member representation (ADMIN, MEMBER)

Benefits:
- Single source of truth from backend
- Consistent data across features (Projects, Settings, Team)
- Scalable for future permissions and role management

### Centralized State Management
- Connected Team module to Redux store:
  - `members`
  - `loading`
  - `currentWorkspaceId`
- Ensured reactive updates when workspace changes

Benefits:
- Eliminates duplicate data fetching
- Enables reuse across multiple modules
- Predictable state synchronization

### Reusable Filtering System
- Introduced `FiltersBar` component for search and dropdown filters
- Implemented generic typing (`T extends string`) for flexibility and type safety
- Integrated across:
  - Team page
  - Projects page

Enhancements:
- Debounced search using `useDebounce`
- Fixed role filtering mismatch with backend enums

Benefits:
- Reusable filtering logic
- Consistent UX across modules
- Reduced duplication

### Dynamic Stats System
- Replaced static stats with dynamic computation using `useMemo`
- Introduced reusable `StatsCard` component

Metrics:
- Total Members
- Admin Count
- Member Count

Benefits:
- Real-time data reflection
- Reusable stat pattern across dashboard features
- Improved performance with memoization

### UI System Standardization

- Introduced reusable `PrimaryButton` component
- Standardized:
  - Header structure (spacing, typography)
  - Button styling
  - Icon sizing

Unified across:
- Dashboard
- Team
- Projects

Benefits:
- Consistent design language
- Easier future scaling
- Reduced UI inconsistencies

### Layout & UX Improvements

- Fixed layout shift between table and empty states
- Aligned empty state width with table container
- Removed incorrect vertical centering
- Standardized spacing (`space-y-8`, `gap-6`)
- Improved responsiveness across devices

Benefits:
- Stable layout rendering
- Better visual consistency
- Improved mobile experience

### Table Enhancements

- Improved TeamTable responsiveness with horizontal scrolling
- Fixed header/data alignment issues using consistent column sizing
- Enhanced accessibility:
  - Semantic table structure
  - Proper spacing and readability

Benefits:
- Better usability on smaller screens
- Improved accessibility compliance
- Cleaner visual hierarchy


### Refactoring & Code Quality

- Removed nested layout structures
- Centralized layout handling at root level
- Separated UI into reusable components
- Cleaned up redundant logic and debug code

Benefits:
- Improved maintainability
- Cleaner component structure
- Scalable architecture

### Accessibility Improvements
- Added semantic labels (`aria-label`)
- Improved spacing and structure for readability
- Enhanced keyboard and screen reader support

### Result
- Fully backend-driven Team system
- Reusable filtering and UI components across modules
- Consistent design system across the application
- Reduced layout shift and improved UX stability
- Strong foundation for scalable feature development


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

### Invitation Flow (Clerk Integration)
The Invite Member functionality is fully integrated with Clerk Organizations.

Flow:
1. Admin submits invite via InviteMemberDialog
2. Frontend calls Clerk API: `organization.inviteMember`
3. Clerk sends invitation email to user
4. User accepts invitation
5. Backend sync is handled via webhook (organizationMembership.created)

This ensures:
- No custom invitation system required
- Secure and managed authentication flow
- Reliable onboarding process

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

- Centralized base URL configuration
- Automatic JSON headers
- Request interceptor for authentication token injection
- Scalable structure for all API modules

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
- `AuthProvider`
- `authToken.ts`

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
- Stores all user workspaces
- Maintains current workspace selection
- Persists workspace ID in localStorage
- Handles API loading and error states

### Async Thunks:
- `fetchWorkspaces` → fetches workspace data from backend
- `setWorkspaceWithPersistence` → syncs Redux + localStorage
- `deleteWorkspaceWithCleanup` → removes workspace safely

## Workspace Persistence Logic

The selected workspace is persisted using localStorage:
- Automatically restored on app reload
- Falls back to first available workspace if invalid
- Ensures consistent user experience across sessions

### Data Fetching Optimization
Improved data fetching strategy to prevent redundant API calls and unstable renders.

Changes:
- `fetchWorkspaces` runs only once on app load
- Removed dependency on unstable objects (e.g., Clerk `user`)
- Prevented repeated API calls triggered by re-renders

Benefits:
- Reduced backend load
- Improved performance
- Stable component lifecycle

## Task State Management
A dedicated task slice is implemented for managing task data.

### Features:
- Add, update, delete tasks
- Store project-specific tasks
- Designed for future backend integration

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
- Safer API integration
- Better developer experience
- Fewer runtime errors

## Project & Workspace Integration
The application is fully integrated with the backend APIs.

### Workspace Flow
- Fetch workspaces using `fetchWorkspaces` thunk
- Persist current workspace in Redux + localStorage
- Automatically restore workspace on reload

### Members Flow
- Fetch workspace members using `fetchWorkspaceMembers`
- Used in:
  - Project Lead selection
  - Team Members selection

### Project Flow
- Fetch projects based on Clerk active organization
- Clerk acts as the single source of truth for workspace context
- Removed redundant Redux-driven workspace synchronization
- Ensures consistent and accurate data fetching

Benefits:
- Eliminates mismatched workspace state
- Prevents unnecessary API calls
- Simplifies data flow

### Data Transformation

Frontend sends:
- team_lead (email)
- team_members (emails)

Backend:
- Converts emails → user IDs
- Validates workspace membership
- Stores relational data using Prisma

This ensures:
- Clean frontend logic
- Strong backend validation
- Secure multi-tenant architecture

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

- Clean separation of concerns
- Scalability
- Maintainability

## Advanced Data Fetching & Caching Architecture

To support scalable multi-workspace data handling and improve performance,  
the application introduces a normalized Redux state structure combined with a cache-first and stale-while-revalidate (SWR) data fetching strategy.

### Problem
Previously:
- Data was stored in a flat structure
- Switching workspaces triggered unnecessary refetching
- Components caused duplicate API calls
- UI experienced loading flickers and unstable states

### Normalized Workspace-Aware State

Refactored Redux state to store data per workspace:
- `membersByWorkspace`
- `projectsByWorkspace`

Each workspace entry contains:

- `data`
- `status`
- `lastFetched`

Benefits:
- Eliminates data duplication
- Supports multi-workspace scalability
- Enables efficient caching

### Cache-First Data Fetching
- Components read from Redux cache before making API calls
- Prevents redundant requests during navigation and re-renders

Benefits:
- Faster UI response
- Reduced backend load

### Stale-While-Revalidate (SWR)
- Cached data is shown immediately
- Background refetch updates data silently

Benefits:
- No UI flicker
- Always up-to-date data

### TTL-Based Cache Invalidation
- Data freshness is controlled using `lastFetched`
- Cache is invalidated after a defined duration

Benefits:
- Prevents stale data
- Avoids over-fetching

### Improved Loading State Management
Differentiated loading types:

- Initial loading (no cached data)
- Background loading (revalidation)

Benefits:
- Prevents layout shifts
- Maintains UI stability

### Selector Refactoring

Updated all components to use workspace-scoped selectors:
- Dashboard
- Projects
- Team
- StatsGrid

Benefits:
- Consistent data access pattern
- Reduced coupling between components and state

### Runtime Stability Improvements
- Added defensive checks for undefined state
- Fixed crashes caused by stale or inconsistent state references

### UI Improvements
- Stable rendering during background fetches
- Improved Project Overview layout consistency
- Introduced reusable empty states with call-to-action

### Result
- Eliminated redundant API calls
- Stable UI with no loading flicker
- Scalable multi-workspace architecture
- Improved performance and responsiveness
- Established a reusable data-fetching pattern across the application


### RTK Query Integration for Tasks

> Note: The application uses both Redux Thunk and RTK Query for learning and architectural comparison purposes.

### Overview
Introduced a production-ready task data layer using RTK Query, replacing manual fetching logic and improving caching, consistency, and type safety.

### RTK Query Setup
- Added `tasksApi` using a centralized `baseApi`
- Implemented:
  - `getTasks` (query)
  - `createTask` (mutation)
- Enabled automatic cache invalidation using:-
  - `providesTags`
  - `invalidatesTags`

Benefits:
- Centralized API logic
- Automatic cache management
- Reduced boilerplate

### Response Normalization

Used `transformResponse` to standardize API responses:

{ success: true, data: Task[] } → Task[]

Benefits:

* Eliminates repetitive `data?.data` checks
* Simplifies component consumption
- Improves readability

### UI Integration
- Replaced manual fetching with `useGetTasksQuery`
- Integrated across:
  - ProjectLayout
  - ProjectTasks
- Connected CreateTaskDialog with `createTask` mutation

Benefits:
- Declarative data fetching
- Cleaner component logic
- Automatic loading + error handling

### Derived State (Task Analytics)

Computed metrics on the client:
- Total Tasks
- Completed Tasks
- In Progress Tasks
- Overdue Tasks

Benefits:
- Avoids redundant backend calls
- Keeps analytics computation efficient and localized

### Error Handling & UI Stability
- Handled API failures using `isError`
- Introduced safe fallback pattern:

const safeTasks = isError ? [] : tasks;

Benefits:
- Prevents UI crashes
- Ensures stable rendering under failure conditions

### Date Handling Fix (Critical)

Fixed runtime error:
- `RangeError: Invalid time value`

Solution:
if (isNaN(date.getTime())) return "-";

Benefits:
- Prevents crashes in table rendering
- Ensures safe date formatting

### Type Safety Improvements
* Unified `Task` type across application
* Removed duplicate/local type definitions
* Fixed API mismatches:
  * `dueDate` vs `due_date`

Benefits:
- Stronger type guarantees
- Reduced runtime inconsistencies

### Mutation Handling
- Integrated `createTask` mutation with:
  - Loading states
  - Success/error toast feedback
- Enabled automatic refetch:

invalidatesTags: ["Tasks"]

Benefits:
- Keeps UI in sync with backend
- Eliminates manual refetch logic

### Result
- Cleaner and declarative data flow using RTK Query
- Improved UI reliability under error conditions
- Reduced boilerplate compared to manual fetching
- Stronger type safety and maintainability
- Scalable foundation for future task features (update, delete, filters, pagination)

### Project Members State Refactor & Reusable Hooks

### Overview
Refactored member data handling by introducing project-level member state, replacing incorrect workspace-based usage.

Implemented normalized state and reusable hooks to ensure scalable, maintainable, and consistent data access across the application.

### State Management
- Introduced `projectMembersByProject` in Redux store
- Implemented normalized state structure for project-level data
- Added `fetchProjectMembers` async thunk

Benefits:
- Enables project-scoped data isolation
- Prevents cross-project data leakage
- Supports scalable multi-project architecture

### Reusable Hooks

- Created `useProjectMembers` hook:

  - Handles fetching, caching, and state selection for project members
- Created `useWorkspaceMembers` hook:

  - Eliminates duplicate logic across components

Benefits:
- Centralized data access logic
- Reduces code duplication
- Improves maintainability and readability

### Refactoring
- Updated `ProjectSettings` to use reusable hooks
- Removed manual data fetching logic from components
- Standardized data access patterns across the application

Benefits:
- Cleaner component structure
- Separation of concerns (UI vs data logic)
- Easier future enhancements

### UI Improvements
- Improved loading state handling for async operations
- Added safe fallback patterns to prevent crashes
- Ensured stable rendering during data fetching

Benefits:
- Better user experience
- No UI flickers or crashes
- Predictable rendering behavior

### Fixes
- Fixed incorrect usage of workspace members for project-level features
- Resolved TypeScript issues related to inconsistent state shapes
- Prevented runtime crashes caused by undefined or missing data

### Result
- Accurate project member assignment
- Reusable and scalable architecture
- Improved developer experience
- Consistent and reliable data flow across components

### Task Details Page & Real-Time Discussion System

### Overview
Introduced a dedicated Task Details page with an integrated discussion system, enabling real-time task-level collaboration.

Implemented paginated comments, infinite scrolling, and optimistic updates to deliver a responsive and scalable user experience.

### Task Details Page
- Implemented `TaskDetails` page to display detailed task information
- Integrated discussion UI for task-level communication
- Connected `ProjectTasks` table row click → navigates to TaskDetails page

Benefits:
- Improves task visibility and context
- Enables centralized discussion per task
- Enhances user workflow and navigation

### RTK Query Integration

Configured API layer using RTK Query for task-level operations:
- Fetching task details
- Fetching paginated comments (cursor-based)
- Adding comments via mutation

Benefits:
- Centralized API management
- Built-in caching and revalidation
- Simplified async handling

### Infinite Scroll (Cursor Pagination)
- Implemented infinite scrolling for comments
- Uses cursor-based pagination for efficient data loading
- Automatically fetches additional comments on scroll

Benefits:
- Scales efficiently for large comment datasets
- Avoids heavy initial payloads
- Smooth user experience

### Optimistic Updates
- Added optimistic UI updates for comment creation
- Updates UI immediately before server response

Benefits:
- Instant user feedback
- Improved perceived performance
- Better interaction experience

### Authentication Integration
- Integrated Clerk authentication
- Ensured current user context is available for comment actions

Benefits:
- Secure comment operations
- Accurate user attribution in discussions

### UI Stability Improvements
- Fixed layout shift using fixed-height containers
- Implemented scrollable comments section
- Added sticky input for continuous interaction

Benefits:
- Stable layout during async updates
- Better usability for long discussions
- Improved user experience

### Accessibility Enhancements
- Used semantic HTML structure
- Added ARIA attributes for better accessibility support

Benefits:
- Improved screen reader compatibility
- Better keyboard navigation

### Type Safety Improvements
- Safely handled undefined `taskId`
- Resolved type conflicts in Comment model
- Strengthened typing across components and API layer

Benefits:
- Prevents runtime errors
- Improves developer confidence
- Ensures consistent data contracts

### API Refactoring
- Standardized API hook exports
- Unified API usage patterns across components

Benefits:
- Cleaner and predictable API layer
- Easier maintenance and scalability

### Architecture Decisions
- Adopted RTK Query for caching and data fetching
- Used cursor-based pagination for scalability
- Implemented optimistic updates for UX performance
- Maintained modular and reusable component structure

### Result
-  Fully functional task discussion system
-  Scalable comment loading with infinite scroll
-  Real-time-like UX using optimistic updates
-  Improved architecture consistency and maintainability

### Discussion UX Enhancements (Chat-Like Experience)

### Overview
Enhanced the task discussion system to behave closer to a real-time chat interface by improving optimistic UI handling, fixing alignment inconsistencies, and refining input and scrolling interactions.

### Optimistic UI Improvements
-  Replaced placeholder user data with actual logged-in user details
-  Fixed message alignment flicker (left → right shift)
-  Implemented stable `tempId` handling to correctly reconcile optimistic messages

Benefits:
-  Eliminates UI inconsistencies during optimistic updates
-  Ensures correct message ownership rendering
-  Provides stable and predictable UI behavior

### Comment Rendering & Scroll Behavior
-  Implemented auto-scroll to latest message on new comments
-  Ensured consistent rendering order for incoming and optimistic messages
-  Improved infinite scroll stability with cursor-based pagination

Benefits:
- Smooth chat-like scrolling experience
- Prevents message jumps or incorrect ordering
- Handles large datasets efficiently

### Input & Interaction Enhancements
- Added **Enter key** support to send messages
- Added **Shift + Enter** support for multiline input
- Cleared textarea instantly on submit
- Refactored submit logic for better separation of concerns

Benefits:
- Faster and more intuitive user interaction
- Matches real-world chat application behavior
- Improves responsiveness and usability

### UI Refinements
- Fixed message alignment using flex:
  - Right-aligned for current user
  - Left-aligned for other users
- Corrected message bubble width to remove extra spacing
- Improved layout stability and responsiveness

Benefits:
- Clean and consistent chat UI
- Better visual hierarchy
- No layout shifts during updates

### Technical Improvements
- Leveraged RTK Query optimistic updates via `updateQueryData`
- Ensured consistent API response handling using `transformResponse`
- Maintained clear separation between UI and data layer

Benefits:
- Scalable and maintainable architecture
- Predictable state updates
- Cleaner data flow

### Result
The discussion panel now behaves like a modern chat system:

- Instant feedback with optimistic updates
- Smooth auto-scrolling experience
- Stable and consistent UI rendering
- Improved usability and interaction flow

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

Workspace switching is handled explicitly through user interaction (dropdown selection).

Flow:

1. User selects workspace from dropdown
2. Clerk `setActive()` updates organization context
3. Application reacts to Clerk state change
4. Data fetching is triggered based on active organization

Key Improvements:

- Removed automatic `setActive()` calls from root-level effects
- Prevented infinite re-render loops caused by Clerk + Redux synchronization
- Ensured workspace switching is predictable and user-driven
- Eliminated unstable dependency chains

This results in:
- Stable render cycles
- Better performance
- Clear single source of truth (Clerk active organization)

### Create Workspace (Clerk Integration)

- Uses Clerk's `openCreateOrganization()` API
- Opens a fully managed modal (centered, responsive)
- Handles:
  - Organization creation
  - Validation
  - Closing interactions (ESC, outside click)

No custom modal implementation is required.

### State Synchronization
The application uses Clerk as the single source of truth for active organization.

Improvements:
- Removed redundant synchronization between Redux and Clerk
- Avoided bi-directional syncing issues
- Reduced unnecessary re-renders

Redux now handles:
- UI state
- Cached workspace data

Clerk handles:
- Active organization context

This separation ensures:
- Predictable state flow
- Reduced complexity
- Better scalability

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
-  Cached workspace data
This separation ensures scalability and maintainability in a multi-tenant SaaS architecture.

### Invitation & Membership Sync (Clerk + Webhooks + Inngest)
The application uses Clerk's organization invitation system combined with webhooks and background processing to ensure database consistency.

#### Flow:
1. Admin invites user via Clerk Organization
2. User accepts invitation
3. Clerk triggers `organizationMembership.created` webhook
4. Backend receives webhook and forwards event to Inngest
5. Inngest processes the event and:
   - Creates or updates `WorkspaceMember` in database
6. User logs in and gets immediate access to workspace and projects

#### Why this approach?
- Avoids frontend-based sync issues
- Ensures reliable and retry-safe processing
- Works even if user logs in later
- Prevents race conditions between auth and DB

#### Architecture:
Clerk (Auth + Org)
→ Webhook (Event trigger)
→ Inngest (Background processing)
→ Database (WorkspaceMember sync)

#### Important Note:
The application relies on the `organizationMembership.created` webhook event.

Ensure this event is enabled in the Clerk dashboard under Webhooks.

Without this, invited users will not be synced into the database, resulting in:
- Empty workspace state
- 403 errors on protected APIs

### Issue & Fix
Previously, invited users were not being added to the `WorkspaceMember` table after accepting invitations.

Root Cause:
- The `organizationMembership.created` webhook event was not enabled in the Clerk dashboard
- As a result:
  - Inngest workflow was never triggered
  - WorkspaceMember records were not created

Impact:
- Users saw empty workspace state after login
- Project APIs returned 403 (unauthorized access)
- Application appeared broken despite successful invitation

Fix:
- Enabled `organizationMembership.created` event in Clerk dashboard
- Activated existing Inngest workflow for membership sync

Result:
- Users are now correctly added to `WorkspaceMember` table
- Workspace data loads properly after invite acceptance
- Access to projects is restored

## Real-Time UX Enhancements
- Projects update instantly after creation (no reload)
- Workspace switching updates entire app state
- Skeleton loaders improve perceived performance
- Optimistic UI updates for better UX

This mimics real production SaaS behavior.

## Stability & Performance Improvements
- Eliminated excessive Clerk session revalidation (prevented 429 errors)
- Reduced unnecessary component re-renders
- Fixed infinite render loops caused by improper effect dependencies
- Improved overall application stability under frequent state updates

This ensures production-level reliability and scalability.

## Application Initialization & Auth Stability
Implemented a controlled application bootstrap flow to ensure authentication and routing stability.

### App Initialization Wrapper
- Introduced `AppWrapper` to delay application rendering until Clerk authentication is fully initialized
- Prevents rendering protected routes before auth state is ready

### Layout Skeleton (Initial Load UX)
- Implemented `LayoutSkeleton` to display full app structure (Sidebar + Main Content) during initial load
- Replaced blank white screen with structured loading UI

Benefits:
- Eliminates layout shift
- Provides consistent perceived performance
- Improves user experience during app startup

### Auth Race Condition Fix
Resolved issue where routes were rendered before Clerk session was initialized.

Fix:
- Deferred route rendering until authentication state is ready
- Ensured token availability before API calls

Impact:
- Prevented unauthorized API requests
- Eliminated inconsistent route access

### Protected Route Refactor
- Updated `ProtectedRoute` to rely on Clerk (`useUser`) instead of Redux
- Ensures authentication state comes from a single source of truth

Benefits:
- Avoids state mismatch between Redux and Clerk
- Improves reliability of route protection

### CORS & Early Request Fix
Resolved intermittent CORS errors caused by API calls being triggered before authentication token was available.

Fix:
- Prevented API execution until Clerk initialization completes
- Ensured token injection happens before any request

Impact:
- Eliminated unauthorized requests
- Stabilized API communication

### Navigation Stability Improvements
- Eliminated redirect flickering during initial load
- Ensured consistent navigation behavior across sessions

### Architecture Improvements
- Centralized global loading logic inside `AppWrapper`
- Established clear application lifecycle:
  
  Clerk Init → Auth Ready → Render App → Allow API Calls

Benefits:
- Scalable initialization pattern
- Cleaner separation of concerns
- Predictable application behavior