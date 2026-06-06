// common types related to workspaces, projects, tasks, and billing

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type Role = "ADMIN" | "MEMBER";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  owner: {
    id: string;
    email: string;
    name?: string;
    imageUrl?: string;
  };


  projects?: Project[];
}


export type ProjectStatus = | "PLANNING" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "CANCELLED";

export type ProjectPriority = | "LOW" | "MEDIUM" | "HIGH";


export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status: ProjectStatus;
  priority: ProjectPriority;
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


// task types 

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type TaskType = "TASK" | "BUG" | "FEATURE" | "IMPROVEMENT" | "OTHER";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  type: TaskType;
  priority: TaskPriority;
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
    workspaceId: string;
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
    workspaceId: string;
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


// API payload types

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



// ui types

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



// asnchronous state types

export type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export interface AsyncState<T> {
  data: T;
  status: AsyncStatus;
  error?: string | null;
}



//  redux state types

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

// other types


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

// billing types
export type Plan =
    | "FREE"
    | "PRO"
    | "ENTERPRISE";

export type BillingCycle =
    | "MONTHLY"
    | "QUARTERLY"
    | "YEARLY";

export type FeatureValue =
    | boolean
    | string;