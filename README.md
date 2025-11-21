# 🧩 Project Management App

A modern **Project Management Dashboard** built with **React Router v7**, **Redux Toolkit**, and **TailwindCSS** — featuring a responsive layout with a Sidebar and Navbar, theme toggle, and scalable architecture ready for API and backend integration.

---

## 🚀 Features (Current Progress)

✅ **React Router v7 (App Directory)**  
✅ **Responsive Navbar and Sidebar Layout**  
✅ **Dark / Light Theme Toggle (dummy state for now)**  
✅ **Accessible UI (WCAG 2.1 AA)**  
✅ **Reusable Component Structure**  
✅ **Production-Ready Folder Architecture**  
✅ **Lazy-loaded Dashboard Sections**  
✅ **Skeleton Loaders for All Dashboard Components**  

---

##  Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Router** | [React Router v7](https://reactrouter.com/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) |
| **Styling** | [TailwindCSS v4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Language** | TypeScript (ES Modules) |

---

## 📈 Project Progress

A clear summary of all development completed so far:

### **✔️ Core UI & Layout**
- Implemented a fully responsive **Navbar**  
  - Search bar  
  - Theme toggle button  
  - User avatar  
  - WCAG-compliant accessibility & ARIA attributes  
- Built a **mobile-responsive Sidebar**  
  - Slide-in mobile behavior  
  - Overlay + ESC to close  
  - Keyboard navigation support  
  - Desktop fixed layout  

### **✔️ Dashboard Page**
- Added Dashboard as the main homepage through `_index.tsx`  
- Integrated with the global layout (Sidebar + Navbar)  
- Optimized using:
  - `React.lazy()`  
  - `Suspense`  
  - `memo()` for performance  

### **✔️ Skeleton Loaders (Production Standard)**
Created reusable skeleton loading UIs for a smoother and more modern user experience:
- `StatsGridSkeleton`
- `ProjectOverviewSkeleton`
- `RecentActivitySkeleton`
- `TaskSummarySkeleton`

All skeletons follow consistent design, accessibility rules, and TailwindCSS animation patterns.

---





