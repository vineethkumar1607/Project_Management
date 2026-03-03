export interface User {
    id: string
    name: string
    email: string
    avatar: string
}

export const dummyUsers: User[] = [
  {
    id: "user_1",
    name: "Vineeth",
    email: "vineeth@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "user_2",
    name: "Shruthi",
    email: "shruthi@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "user_3",
    name: "Rahul",
    email: "rahul@example.com",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
]

export interface Workspace {
    id: string
    name: string
    slug: string
    image: string
    ownerId: string
    createdAt: string
}

export const dummyWorkspaces: Workspace[] = [
    {
        id: "ws_1",
        name: "Design Studio",
        slug: "design-studio",
        image: "https://picsum.photos/200",
        ownerId: "user_1",
        createdAt: "2026-01-01",
    },
    {
        id: "ws_2",
        name: "Engineering Hub",
        slug: "engineering-hub",
        image: "https://picsum.photos/200",
        ownerId: "user_1",
        createdAt: "2026-01-05",
    },
]



export interface WorkspaceMember {
    id: string
    workspaceId: string
    userId: string
    role: "ADMIN" | "MEMBER"
}

export const dummyWorkspaceMembers: WorkspaceMember[] = [
    { id: "wm_1", workspaceId: "ws_1", userId: "user_1", role: "ADMIN" },
    { id: "wm_2", workspaceId: "ws_1", userId: "user_2", role: "MEMBER" },
    { id: "wm_3", workspaceId: "ws_1", userId: "user_3", role: "MEMBER" },

    { id: "wm_4", workspaceId: "ws_2", userId: "user_1", role: "ADMIN" },
    { id: "wm_5", workspaceId: "ws_2", userId: "user_3", role: "MEMBER" },
]




export interface Project {
    id: string
    name: string
    workspaceId: string
    color: string
    status: "PLANNING" | "ACTIVE" | "COMPLETED"
    progress: number
}

export const dummyProjects: Project[] = [
    {
        id: "proj_1",
        name: "Website Redesign",
        workspaceId: "ws_1",
        color: "#3B82F6",
        status: "ACTIVE",
        progress: 70,
    },
    {
        id: "proj_2",
        name: "Mobile App MVP",
        workspaceId: "ws_1",
        color: "#6366F1",
        status: "ACTIVE",
        progress: 45,
    },
    {
        id: "proj_3",
        name: "Internal Tools",
        workspaceId: "ws_2",
        color: "#10B981",
        status: "PLANNING",
        progress: 15,
    },
]

export interface Task {
    id: string
    title: string
    projectId: string
    type: "FEATURE" | "BUG" | "TASK"
    status: "TODO" | "IN_PROGRESS" | "DONE"
    priority: "LOW" | "MEDIUM" | "HIGH"
    assigneeId: string
    dueDate: string
}

export const dummyTasks: Task[] = [
    {
        id: "task_1",
        title: "Design login page",
        projectId: "proj_1",
        type: "FEATURE",
        status: "IN_PROGRESS",
        priority: "HIGH",
        assigneeId: "user_1",
        dueDate: "2026-02-20",
    },
    {
        id: "task_2",
        title: "Fix auth bug",
        projectId: "proj_1",
        type: "BUG",
        status: "TODO",
        priority: "MEDIUM",
        assigneeId: "user_2",
        dueDate: "2026-02-25",
    },
    {
        id: "task_3",
        title: "Database migration",
        projectId: "proj_2",
        type: "TASK",
        status: "DONE",
        priority: "HIGH",
        assigneeId: "user_3",
        dueDate: "2026-02-15",
    },
]






