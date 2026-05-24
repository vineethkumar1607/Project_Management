// ================== CORE DOMAIN ==================

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type Role = "ADMIN" | "MEMBER";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  owner: {
    email: string;
  };
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status: "PLANNING" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  progress?: number;
  start_date?: string;
  end_date?: string;
  workspaceId: string;
  team_lead: string;

  members?: ProjectMember[];
  tasks?: Task[];
}

export interface ProjectMember {
  id: string;
  role?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface WorkspaceMember {
  id: string;
  name: string;
  email: string;
}


// ================== TASK ==================

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type TaskType = "TASK" | "BUG" | "FEATURE" | "IMPROVEMENT" | "OTHER";

export type Task = {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  type: "BUG" | "FEATURE" | "IMPROVEMENT";
  priority: "LOW" | "MEDIUM" | "HIGH";
  due_date?: string;
  assignee: {
    id: string;
    name: string;
    image?: string;
    email?: string;
  };

  projectId: string;

  project?: {
    id?: string;
    name?: string;
    team_lead?: string;
  };
};

export type TaskDetails = {
  id: string;
  title: string;
  description?: string;
  status: string;
  type: string;
  priority: string;
  due_date: string;
  assignee: {
    id: string;
    name: string;
    image?: string;
  };
  project: {
    id: string;
    name: string;
    status: string;
    priority: string;
  };
};

export interface TaskItem {
    id: string;
    title: string;
    type?: string;
    priority?: string;
    date?: string;
}

export interface TaskListCardProps {
    title: string;
    count?: number;
    tasks: TaskItem[];

    icon?: LucideIcon;

    emptyMessage: string;

    variant?: "default" | "overdue";

    showDate?: boolean;
    showMeta?: boolean;
}

export type TaskComment = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
};


// ================== API PAYLOADS ==================

export type CreateProjectPayload = {
  name: string;
  description?: string;
  status: Project["status"];
  priority: Project["priority"];
  progress?: number;
  start_date?: string;
  end_date?: string;
  team_lead?: string;
  team_members: string[];
};

export type TaskFormData = {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  assigneeId: string;
  due_date: string;
};



// ================== UI TYPES ==================

export type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void> | void;
  loading?: boolean;

  children?: React.ReactNode;
  confirmDisabled?: boolean;  
};

export type DangerZoneSectionProps = {
    title: string;
    description: string;
    children: ReactNode;
};

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterConfig = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: FilterOption[];
};

export interface FiltersBarProps {
  search: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  filters?: FilterConfig[];
}



// ================== ASYNC STATE ==================

export type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export interface AsyncState<T> {
  data: T;
  status: AsyncStatus;
  error?: string | null;
}



// ================== REDUX STATE ==================

export type ProjectsByWorkspace = {
  [workspaceId: string]: AsyncState<Project[]>;
};

export type ProjectMembersByProject = {
  [projectId: string]: AsyncState<ProjectMember[]>;
};

export interface ProjectState {
  projectsByWorkspace: ProjectsByWorkspace;
  projectMembersByProject: ProjectMembersByProject;
}

// ================== ANALYTICS TYPES==================


export type ChartData = {
  name: string;
  value: number;
};

export type PriorityChartData = {
  name: string;
  value: number;
  percentage: number;
};

export type CalendarTask = {
  id: string;
  title: string;
  date: string;
  priority: "low" | "medium" | "high";
};