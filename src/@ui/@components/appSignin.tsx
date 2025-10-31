import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export function AppSignup() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const HandleSignup = () => {
    if (!Email || !Password) {
      toast.error("Please fill all the fileds", { richColors: true });
      return;
    } else if (!emailCheck.test(Email)) {
      toast.error("enter a valid email formate", { richColors: true });
    } else if (Password.length < 8) {
      toast.error("password must be atleast 8-digit", { richColors: true });
    } else toast.success("Created your account", { richColors: true });
  };

  return (
    <>
      <Card
        className="
          w-[80%]
          md:flex md:flex-col md:w-[28%] md:bg-gray-100 md:gap-5
        "
      >
        <CardHeader>
          <CardTitle
            className="
              text-2xl
            "
          >
            Lets Get started with us!
          </CardTitle>
          <CardDescription>
            Fill all the fields to create your account
          </CardDescription>
        </CardHeader>
        <CardContent
          className="
            flex flex-col
            gap-2
          "
        >
          <CardContent
            className="
              flex flex-col
              gap-2
            "
          >
            <CardTitle>Email</CardTitle>
            <Input
              type="email"
              placeholder="enter email here"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Input>
            <CardTitle>Password</CardTitle>
            <Input
              type="password"
              placeholder="enter password here"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
            <CardTitle>Confirm password</CardTitle>
            <Input
              type="password"
              placeholder="confirm password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
          </CardContent>
          <CardContent
            className="
              flex flex-col
              gap-2
            "
          >
            <Button
              onClick={HandleSignup}
              className="
                cursor-pointer
              "
            >
              Create Account
            </Button>
            <CardDescription className="self-center">or</CardDescription>
            <Button
              className="
                text-black
                bg-gray-300
                cursor-pointer
                hover:text-white
              "
            >
              Singup with Google
            </Button>
            <div
              className="
                flex
                gap-1 self-center
              "
            >
              <CardDescription>Already have an account?</CardDescription>
              <NavLink to="/">
                <CardDescription
                  className="
                    text-black
                    hover:underline
                  "
                >
                  Login
                </CardDescription>
              </NavLink>
            </div>
          </CardContent>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
