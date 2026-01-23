import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn routing="path" path="/login" />
    </div>
  );
}
