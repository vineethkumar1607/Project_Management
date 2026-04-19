import {
  memo,
  useState,
  useCallback,
  type FC,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Role } from "~/types/workspace";

/* ======================= */


interface InviteMemberDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  workspaceName?: string;
  onInvite?: (data: { email: string; role: Role }) => Promise<void>;
}

/* ======================= */

const InviteMemberDialog: FC<InviteMemberDialogProps> = ({
  isOpen,
  setIsOpen,
  workspaceName = "Cloud Ops Hub",
  onInvite,
}) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("org:member");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ======================= */

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email.trim()) return;

      try {
        setIsSubmitting(true);

        await onInvite?.({ email, role });

        setEmail("");
        setRole("org:member");

        setIsOpen(false);
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, role, onInvite, setIsOpen]
  );

  /* ======================= */

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            In workspace:{" "}
            <span className="font-medium">{workspaceName}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(value: Role) => setRole(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="org:member">Member</SelectItem>
                <SelectItem value="org:admin">Admin</SelectItem>

              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting} variant="gradient">
              {isSubmitting ? "Sending..." : "Send Invitation"}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(InviteMemberDialog);
