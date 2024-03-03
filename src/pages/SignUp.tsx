import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function SignUp() {
  return (
    <Card className="w-[400px] ">
      <CardHeader>
        <CardTitle className="text-center mb-4">
          <div className="flex items-center justify-center">
            <img
              src="src/assets/Verisightlogo.png"
              alt="Verisight logo"
              className="w-20 h-20"
              align-items="center"
            />
          </div>
          <div>Login</div>
        </CardTitle>
        <CardDescription>revolutionise your news consumption</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-4">
          <div className="flex  flex-col items-start space-y-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" v@example.com"
              className="border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex  flex-col items-start space-y-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" ********"
              className="border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full"> Log in </Button>
      </CardFooter>
    </Card>
  );
}

export default SignUp;
