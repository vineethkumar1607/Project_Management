// Centralized type definition for calendar feature.
// This prevents duplication and keeps domain models consistent.

export interface CalendarTask {
    id: string
    title: string
    date: string // ISO date string
    priority: "low" | "medium" | "high"
}