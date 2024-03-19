"use client";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Button } from "@/components/ui/button";
import axios from "axios";

//import { useStore } from "@/hooks/useStrore";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/icons";
import React from "react";

import GoogleAuth from "@/googleAuth/googleAuth";

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
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/users/signup",
        data
      );

      console.log("Registration successful:", response.data);
      window.location.href = "/login";

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      console.log(data);
    } catch (error: any) {
      console.error("Registration failed:", error.message);

      setIsLoading(false);
    } finally {
      console.log("Form data:", data);
    }
  }
  //use store hook

  // const setAuthData = useStore((state) => state.setAuthData);

  return (
    <div className="grid grid-cols-1 justify-content-center m-20">
      <div className="flex items-center justify-center">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="container mx-auto flex-col items-center justify-center md:grid lg:max-w-none">
            <Card className="w-[400px]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  <CardHeader>
                    <div className="flex items-center justify-center">
                      <img
                        src="src/assets/Verisightlogo.png"
                        alt="Verisight logo"
                        className="w-20 h-20"
                      />
                    </div>
                    <CardTitle className="text-center mb-4">
                      <div className="text-xl">Sign Up</div>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <div className="flex items-center px-6 space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                  </div>
                  <CardFooter className="flex flex-col space-y-4">
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
                    <div className="have account text text-sm">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-white hover:text-blue-800"
                      >
                        Login
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>

                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>

                      <div className="flex justify-center items-center ">
                        {/*google AUTH*/}
                        <GoogleAuth
                          clientId={
                            "1016920774662-93hbr50o5ocvu2k09fodt0m8pum26k0a.apps.googleusercontent.com"
                          }
                        />
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
