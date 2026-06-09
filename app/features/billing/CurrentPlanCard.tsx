import { BriefcaseBusiness, ChevronRight, FolderKanban, Users, } from "lucide-react";

import PrimaryButton from "~/components/common/PrimaryButton";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

interface CurrentPlanCardProps {
  plan: string;
  projectsUsed: number;
  projectsLimit: number;
  membersUsed: number;
  membersLimit: number;
  onUpgrade: () => void;
}

export default function CurrentPlanCard({ plan, projectsUsed, projectsLimit, membersUsed, membersLimit, onUpgrade, }: CurrentPlanCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
            <BriefcaseBusiness
              size={20}
              className="text-violet-500"
            />
          </div>

          <h3 className="text-xl font-semibold">
            Current Plan
          </h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h4 className="text-2xl font-bold">
            Free Plan
          </h4>

          <p className="mt-2 text-sm text-muted-foreground">
            Perfect for individuals and small teams.
          </p>
        </div>

        <div className="border-t" />

        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
              <FolderKanban
                size={20}
                className="text-blue-500"
              />
            </div>

            <div>
              <p className="font-medium">
                Projects
              </p>

              <p className="text-sm text-muted-foreground">
                {projectsUsed} of {projectsLimit} projects used
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
              <Users
                size={20}
                className="text-violet-500"
              />
            </div>

            <div>
              <p className="font-medium">
                Members
              </p>

              <p className="text-sm text-muted-foreground">
                {membersUsed} of {membersLimit} members used
              </p>
            </div>
          </div>
        </div>

        <div className="border-t" />

        <PrimaryButton className="w-full" onClick={onUpgrade} icon={<ChevronRight className="size-4" />}>
          Upgrade Plan
        </PrimaryButton>
      </CardContent>
      
    </Card>
    
  );
}