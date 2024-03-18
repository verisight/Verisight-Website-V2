import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import axios from "axios"; //to send the data to the server

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

function Login() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const serverLoginURL = "http://localhost:3000/users/login";

    axios
      .post(serverLoginURL, data, {
        withCredentials: true, // Include credentials in the request
      })
      .then((response) => {
        console.log(response.data);
        //Redirect to complete page
        if (response.data.message === "User logged in") {
          window.location.href = "/complete";
        }
      })
      .catch((error) => {
        console.error("There was a problem with the axios request:", error);
      });
  }

  return (
    <div className="grid grid-cols-1 justify-content-center m-20">
      <div className="flex items-center justify-center">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Card className="w-[400px] ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <CardHeader>
                  <div className="flex items-center justify-center mb-1">
                    <img
                      src="src/assets/Verisightlogo.png"
                      alt="Verisight logo"
                      className="w-20 h-20"
                      align-items="center"
                    />
                  </div>
                  <CardTitle className="text-center">
                    <div className="text-xl">Login</div>
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
                            <Input {...field} />
                          </FormControl>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <div className="have account text text-[14px]">
                    Don't have an account ?
                    <Link
                      to="/signup"
                      className="text-white hover:text-blue-800"
                    >
                      {} Sign up
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Login;
