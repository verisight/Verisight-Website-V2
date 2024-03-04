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
