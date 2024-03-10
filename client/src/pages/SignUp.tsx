"use client";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//zod

import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/icons";
import React from "react";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  designation: z.string().min(2, {
    message: "Designation must be at least 2 characters.",
  }),
});

function SignUp() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      designation: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    console.log(data);
  }

  return (
    <div className="grid grid-cols-1 justify-content-center m-20">
      <div className="flex items-center justify-center">
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

            <Card className="w-[400px]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  <CardHeader>
                    <CardTitle className="text-center mb-4">
                      <div className="flex items-center justify-center">
                        <img
                          src="src/assets/Verisightlogo.png"
                          alt="Verisight logo"
                          className="w-20 h-20"
                        />
                      </div>
                      <div>Sign Up</div>
                    </CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="grid w-full gap-4">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Designation</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormDescription>Enter designation</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>

                  <CardFooter className="flex flex-col space-y-2">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Sign Up
                    </Button>
                    <div className="have account text">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-white hover:text-blue-800"
                      >
                        Login
                      </Link>
                      <div className="relative  space-y-8">
                        <div className="absolute inset-0 flex items-center space-y-8">
                          <span className="w-full border-t" />
                        </div>

                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center ">
                        <Button
                          type="submit"
                          variant="outline"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Icons.google className="mr-2 h-4 w-4" />
                          )}{" "}
                          Google
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default SignUp;
