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
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { lookUpApi } from "../../@core/api/api";
import { userAuthStore } from "../../store/userAuthStore";

export function NewAppLogin() {
  const [password, setpassword] = useState("");
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  const setUser = userAuthStore((state) => state.setUser);

  const credentialsFormateCheck = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    // Email check
    if (!Email) {
      return toast.error("Please enter an email", { richColors: true });
    }

    if (!emailRegex.test(Email)) {
      return toast.error("Please enter a valid email format", {
        richColors: true,
      });
    }

    // Password check
    if (!password) {
      return toast.error("Please enter a password", { richColors: true });
    }

    if (!passwordRegex.test(password)) {
      return toast.error("Use 6+ chars, including a letter and number", {
        richColors: true,
      });
    }

    passwordCheck.mutate();
  };

  const passwordCheck = useMutation({
    mutationFn: async () => {
      return await lookUpApi({
        email: Email,
        password: password,
      });
    },
    onSuccess: (res) => {
      toast.success("Verified", { richColors: true });

      setUser(res?.data.user, res?.data.token);
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Invalid Password", { richColors: true });
    },
  });

  return (
    <>
      <Card className=" md:flex md:flex-col md:gap-5 md:w-[28%] md:bg-gray-100 w-[80%] ">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>
            Use your Credential to get in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CardContent className="flex flex-col gap-2">
            <CardTitle>Email</CardTitle>
            <Input
              type="email"
              placeholder="enter email here"
              autoFocus
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  credentialsFormateCheck();
                }
              }}
            />
            <CardTitle>Password</CardTitle>
            <Input
              type="password"
              placeholder="enter password here"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  credentialsFormateCheck();
                }
              }}
            />
          </CardContent>
          <CardContent className="flex flex-col gap-2">
            <Button
              className="cursor-pointer"
              disabled={passwordCheck.isPending}
              onClick={() => {
                passwordCheck.mutate();
              }}
            >
              {passwordCheck.isPending ? "Logging in..." : "Login"}
            </Button>
            <CardDescription className="self-center">or</CardDescription>
            <Button className="cursor-pointer">Login with Google</Button>
            <div className="flex gap-1 self-center">
              <CardDescription>Don't have an account?</CardDescription>
              <NavLink to="/create-new-account">
                <CardDescription className="hover:underline text-black">
                  Signup
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
