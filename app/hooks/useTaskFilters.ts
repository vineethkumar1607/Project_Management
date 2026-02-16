import { useSearchParams } from "react-router";
type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
type TaskType = "BUG" | "FEATURE" | "TASK";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

interface TaskFilters {
    status?: TaskStatus;
    type?: TaskType;
    priority?: TaskPriority;
    assignee?: string;
}



/**
 * Custom hook that:
 * - Reads filters from URL
 * - Updates filters in URL
 * - Keeps URL as single source of truth
 */
export function useTaskFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Read current filters from URL
    const filters: TaskFilters = {
        status: searchParams.get("status") as any,
        type: searchParams.get("type") as any,
        priority: searchParams.get("priority") as any,
        assignee: searchParams.get("assignee") as any,
    };

    /**
     * Updates a single filter in URL
     */
    const updateFilter = (key: keyof TaskFilters & string, value?: string) => {

        const params = new URLSearchParams(searchParams);

        if (!value) {
            params.delete(key); // removes if empty
        } else {
            params.set(key, value);
        }

        setSearchParams(params);
    };

    /**
     * Reset all filters
     */
    const resetFilters = () => {
        setSearchParams({});
    };

    return { filters, updateFilter, resetFilters };
}
