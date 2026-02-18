
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export default function AddMemberDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Member</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Project Member</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <Input placeholder="Enter email" />
                    <Button className="w-full">Invite</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
