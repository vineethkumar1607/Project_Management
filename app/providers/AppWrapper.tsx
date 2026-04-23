import { useUser } from "@clerk/clerk-react";
import LayoutSkeleton from "../components/layout/LayoutSkeleton";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded } = useUser();

  //GLOBAL LOADING
  if (!isLoaded) {
    return <LayoutSkeleton />;
  }

  return <>{children}</>;
}