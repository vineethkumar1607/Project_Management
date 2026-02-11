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
import { Textarea } from "~/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

/* ======================= */

interface CreateProjectDialogProps {
  setIsDialogOpen: (open: boolean) => void;
}

/* ======================= */

const mockMembers = [
  { id: "1", name: "vineeth@gmail.com" },
  { id: "2", name: "shruthi@gmail.com" },
  { id: "3", name: "vikram@gmail.com" },
  { id: "4", name: "satya@gmail.com" },
];

/* ======================= */

const CreateProjectDialog: FC<CreateProjectDialogProps> = ({
  setIsDialogOpen,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState("PLANNING");
  const [priority, setPriority] = useState("MEDIUM");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [lead, setLead] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  /* ======================= */

  const handleMemberToggle = (id: string) => {
    setMembers((prev) =>
      prev.includes(id)
        ? prev.filter((m) => m !== id)
        : [...prev, id]
    );
  };

  /* ======================= */

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const payload = {
      status,
      priority,
      startDate,
      endDate,
      lead,
      members,
    };

    console.log(payload);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsDialogOpen(false);
    }, 1000);
  }, [status, priority, startDate, endDate, lead, members, setIsDialogOpen]);

  /* ======================= */

  return (
    <Dialog open onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            In workspace:{" "}
            <span className="font-medium">Design Team</span>
          </DialogDescription>
        </DialogHeader>


        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Project Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Name</label>
            <Input placeholder="Enter project name" required />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea placeholder="Project description" />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANNING">Planning</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="ON_HOLD">On Hold</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="COMPLETED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>


          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>


          {/* Project Lead (FULL WIDTH) */}
          <div className="space-y-2 w-full">
            <label className="text-sm font-medium">Project Lead</label>
            <Select value={lead} onValueChange={setLead}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select lead" />
              </SelectTrigger>
              <SelectContent>
                {mockMembers.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


          {/* Team Members (FULL WIDTH) */}
          <div className="space-y-2 w-full">
            <label className="text-sm font-medium">Team Members</label>
            <Select onValueChange={(value) => handleMemberToggle(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add team members" />
              </SelectTrigger>
              <SelectContent>
                {mockMembers.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {members.includes(m.id) ? `✓ ${m.name}` : m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>


      </DialogContent>
    </Dialog>
  );
};

export default memo(CreateProjectDialog);
