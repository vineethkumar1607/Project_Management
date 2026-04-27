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
            onOpenChange(false); // close ONLY on success
        } catch (err) {
            // keep dialog open if error
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
                        autoFocus
                    >
                        {loading ? "Processing..." : confirmText}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;