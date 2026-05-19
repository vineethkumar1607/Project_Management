import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";

interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}

export default function ErrorState({
    title = "Something went wrong",
    description = "Unable to load data. Please try again.",
    onRetry,
}: ErrorStateProps) {
    return (
        <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center space-y-4 max-w-md">
                <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-red-500/10">
                        <AlertTriangle className="size-6 text-red-500" />
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">
                        {title}
                    </h2>

                    <p className="text-sm text-muted-foreground mt-1">
                        {description}
                    </p>
                </div>

                {onRetry && (
                    <Button onClick={onRetry}>
                        Retry
                    </Button>
                )}
            </div>
        </div>
    );
    
}