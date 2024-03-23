"use client";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Button } from "@/components/ui/button";
import axios from "axios";

import React, { useEffect } from "react";

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

import { toast } from "@/components/ui/use-toast";

//import icons
import { MailIcon } from "lucide-react";
import { PasswordInput } from "@/components/ui/passwordInput";

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
  terms: z.boolean().refine((value) => value, {
    message: "You must accept the terms and conditions.",
  }),
});

function SignUp() {
  //state variable for password toggle

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

  //return toast notifications when user enters username or email. if credential found will return already in use toast notification

  const { watch } = form; //watch the field and if change occurs use effect triggered to check if username or email already exists
  const values = watch(["username", "email"]);

  /*useEffect(() => {
    const [username, email] = values;
    if (username) {
      axios
        .post("https://api.verisightlabs.com/users/check-username", {
          username,
        })
        .then((response) => {
          if (response.data.exists) {
            toast({
              title: "Username already in use",
              description: "Please use a different username.",
              variant: "destructive",
            });
          }
        })
        .catch((error) => {
          console.error("Failed to check username:", error.message);
        });
    }

    if (email) {
      axios
        .post("https://api.verisightlabs.com/users/check-email", { email })
        .then((response) => {
          if (response.data.exists) {
            toast({
              title: "Email already in use",
              description: "Please use a different email address.",
              variant: "destructive",
            });
          }
        })
        .catch((error) => {
          console.error("Failed to check email:", error.message);
        });
    }
  }, [values]);*/

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const usernameExists = await axios.post(
        "https://api.verisightlabs.com/users/check-username",
        {
          username: data.username,
        }
      );

      if (usernameExists.data.exists) {
        toast({
          title: "Username already in use",
          description: "Please use a different username.",
          variant: "destructive",
        });
        return;
      }

      const emailExists = await axios.post(
        "https://api.verisightlabs.com/users/check-email",
        {
          email: data.email,
        }
      );

      if (emailExists.data.exists) {
        toast({
          title: "Email already in use",
          description: "Please use a different email address.",
          variant: "destructive",
        });
        return;
      }
      const response = await axios.post(
        "https://api.verisightlabs.com/users/signup",
        data
      );

      console.log("Registration successful:", response.data);
      toast({
        title: "Registered Successfully",
        description: "You will be directed to the login page.",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 3000); // 3000 milliseconds = 3 seconds

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      console.log(data);
    } catch (error: any) {
      console.error("Registration failed:", error.message);

      //invalid email address
      /*if (error.response && error.response.status === 400) {
        toast({
          title: "Invalid email address",
          description: "Please use a valid email address.",
          variant: "destructive",
        });
      }*/

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
                        src="VerisightLogo.png"
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
                              <Input
                                type="email"
                                {...field}
                                suffix={<MailIcon />}
                              />
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
                              <PasswordInput {...field} />
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
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>
                            <Link
                              to="https://verisightlabs.com/privacy"
                              className="text-white-500   hover:text-green-800"
                            >
                              Accept terms and conditions
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                        className="text-white hover:text-green-800"
                      >
                        Login
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                    </div>
                    <div className="flex justify-center items-center "></div>
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
