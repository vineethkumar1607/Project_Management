import { type ReactNode } from "react";

import { Button } from "~/components/ui/button";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

const PrimaryButton = ({ children, onClick, icon, disabled, type = "button", className = "", }: Props) => {
  return (
    <Button
      type={type}
      size="sm"
      variant="gradient"
      onClick={onClick} 
      disabled={disabled}
      className={`flex items-center gap-2 ${className}`}
    >
      {icon}

      {children}
    </Button>
  );
};

export default PrimaryButton;