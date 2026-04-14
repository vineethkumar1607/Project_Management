export interface Task {
  due_date: string;
  assignee?: {
    email: string;
  };
}

export interface Project {
  id: string;
  name: string;

  description?: string | null;

  status: "PLANNING" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH";

  progress?: number;

  end_date?: string;

  members?: { id: string }[];
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