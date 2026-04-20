
import { z } from "zod"

export const projectSettingsSchema = z.object({
  name: z.string().min(3, "Project name is required"),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum([
  "PLANNING",
  "ACTIVE",
  "ON_HOLD",
  "COMPLETED",
  "CANCELLED",
]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
})
