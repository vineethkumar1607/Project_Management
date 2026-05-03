// ================== CORE DOMAIN ==================

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

  assignee: {
    id: string;
    name: string;
    image?: string;
  };

  project: {
    team_lead: string;
  };

  due_date?: string;
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
  lastFetched?: number;
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
  error: string | null;
}

// ================== ANALYTICS TYPES==================


export type ChartData = {
  name: string;
  value: number;
};