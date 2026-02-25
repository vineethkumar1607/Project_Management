// Task status options
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

// Task priority options
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

// Basic Task model
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  type: string;
  priority: TaskPriority;
  due_date: string;
}

// Project model
export interface Project {
  id: string;
  name: string;
  members?: { id: string; name: string }[];
}

// Generic chart data format
export interface ChartData {
  name: string;
  value: number;
}

// Priority chart data
export interface PriorityChartData extends ChartData {
  percentage: number;
}