import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-50 dark:bg-zinc-950 p-4">
      <Card className="w-full max-w-sm p-6 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Sign in to your account
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Google OAuth Button */}
          <Button
            className="w-full flex items-center gap-2 justify-center bg-white text-gray-900 border hover:bg-gray-100 dark:bg-zinc-800 dark:text-white"
            onClick={handleGoogleLogin}
            aria-label="Sign in with Google"
          >
            <FcGoogle size={20} aria-hidden="true" />
            Continue with Google
          </Button>

          <Separator className="my-6" />

          <p className="text-center text-sm text-gray-500 dark:text-zinc-400">
            You will be redirected to Google for secure authentication.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
