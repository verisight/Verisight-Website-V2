/*import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUp({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div
      className="grid
grid-cols-1 justify-content-center m-20"
    >
      <div className="flex items-center justify-center">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In with Email
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}{" "}
              Google
            </Button>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}
export default SignUp;*/
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/ui/user-auth-form";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="container mx-auto flex-col items-center justify-center md:grid lg:max-w-none">
          <Link
            to="/login"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Login
          </Link>
          <div className="lg:p-8 flex items-center justify-center">
            <div className="flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  <div className="flex items-center justify-center">
                    <img
                      src="src/assets/Verisightlogo.png"
                      alt="Verisight logo"
                      className="w-20 h-20"
                      align-items="center"
                    />
                  </div>
                  Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <UserAuthForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our Terms of Service and
                Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default SignUp;
