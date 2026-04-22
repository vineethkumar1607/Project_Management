import { type FC } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import type { ConfirmDialogProps } from "~/types/workspace";



const ConfirmDialog: FC<ConfirmDialogProps> = ({
    open,
    onOpenChange,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    loading = false,
}) => {
    const handleConfirm = async () => {
        try {
            await onConfirm();
            onOpenChange(false);
        } catch (err) {
            // keep dialog open
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">

                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : confirmText}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;