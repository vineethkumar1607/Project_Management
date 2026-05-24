import { useState } from "react";

export const useTaskSelection = (tasks: any[]) => {
    const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
    const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null);

    const toggleTaskSelection = (taskId: string) => {
        setSelectedTaskIds((prev) =>
            prev.includes(taskId)
                ? prev.filter((id) => id !== taskId)
                : [...prev, taskId]
        );
    };

    const handleCheckboxClick = (
        e: React.ChangeEvent<HTMLInputElement>,
        taskId: string,
        index: number
    ) => {
        e.stopPropagation();
        const isShiftPressed = (e.nativeEvent as MouseEvent).shiftKey;

        if (isShiftPressed && lastSelectedIndex !== null) {
            const start = Math.min(lastSelectedIndex, index);
            const end = Math.max(lastSelectedIndex, index);

            const rangeIds = tasks.slice(start, end + 1).map(t => t.id);

            setSelectedTaskIds(prev => Array.from(new Set([...prev, ...rangeIds])));
        } else {
            toggleTaskSelection(taskId);
            setLastSelectedIndex(index);
        }
    };

    const isAllSelected =
        tasks.length > 0 && selectedTaskIds.length === tasks.length;

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedTaskIds([]);
        } else {
            setSelectedTaskIds(tasks.map(t => t.id));
        }
    };

    const clearSelection = () => setSelectedTaskIds([]);

    return {
        selectedTaskIds,
        setSelectedTaskIds,
        handleCheckboxClick,
        toggleSelectAll,
        isAllSelected,
        clearSelection,
    };
};