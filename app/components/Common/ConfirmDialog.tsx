import { type FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "~/components/ui/dialog";
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
    children,
    confirmDisabled = false }) => {

    const handleConfirm = async () => {

        try {
            await onConfirm();
            onOpenChange(false); // close ONLY on success
        } catch (err) {
            console.error("Error during confirmation action:", err);
            // keep dialog open if error
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading || confirmDisabled) {
            return;
        }

        await handleConfirm();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>

                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    {children}
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            {cancelText}
                        </Button>

                        <Button type="submit"
                            variant="destructive"
                            disabled={loading || confirmDisabled}
                        >
                            {loading ? "Processing..." : confirmText}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;
