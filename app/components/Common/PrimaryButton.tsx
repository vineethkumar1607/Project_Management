import { Button } from "~/components/ui/button";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
}

const PrimaryButton = ({ children, onClick, icon }: Props) => {
  return (
    <Button
      size="sm"
      variant="gradient"
      onClick={onClick}
      className="flex items-center gap-2"
    >
      {icon}
      {children}
    </Button>
  );
};

export default PrimaryButton;