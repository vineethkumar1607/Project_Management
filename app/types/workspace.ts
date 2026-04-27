

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
}

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

// -------- Workspace Member --------
export interface WorkspaceMember {
  id: string;
  name: string;
  email: string;
}


export type CreateProjectPayload = {
  name: string;
  description?: string;
  status: string;
  priority: string;
  progress?: number;
  start_date?: string;
  end_date?: string;
  team_lead?: string;
  team_members: string[];
};


export type Role = "ADMIN" | "MEMBER";

export interface ProjectMember {
  id: string;
  role?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  description?: string;

  confirmText?: string;
  cancelText?: string;

  onConfirm: () => Promise<void> | void;

  loading?: boolean;
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

// task related types
// create task payload
export type TaskFormData = {
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  type: "TASK" | "BUG" | "FEATURE" | "IMPROVEMENT" | "OTHER";
  assigneeId: string;
  due_date: string;
};

export interface Task {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  type: "BUG" | "FEATURE" | "TASK";
  assignee: {
    name: string;
    avatar: string;
  };
  due_date: string;
}