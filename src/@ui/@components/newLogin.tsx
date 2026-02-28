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
import { lookUpApi } from "../../@core/api/api";
import { userAuthStore } from "../../store/userAuthStore";

export function NewAppLogin() {
  const [password, setpassword] = useState("");
  const [Email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const setUser = userAuthStore((state) => state.setUser);


const handleLogin = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!Email) return toast.error("Please enter an email", { richColors: true });
  if (!emailRegex.test(Email)) return toast.error("Enter a valid email", { richColors: true });
  if (!password) return toast.error("Please enter a password", { richColors: true });
  if (!passwordRegex.test(password)) return toast.error("Use 6+ chars, including a letter and number", { richColors: true });

  try {
    setloading(true);
    const res = await lookUpApi({ email: Email, password });
    const user = res?.data?.user;

    if (!user) return toast.error(res?.data?.message || "Invalid credentials", { richColors: true });

    setUser(user, res?.data?.token);
    toast.success("Login successful!", { richColors: true });
    navigate("/dashboard");

  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      `Request failed with status ${err?.response?.status || "unknown"}`;
    toast.error(message, { richColors: true });
  }
  finally{
    setloading(false);
  }
};

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
                    handleLogin();
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
                  handleLogin();
                }
              }}
            />
          </CardContent>
          <CardContent className="flex flex-col gap-2">
            <Button
              className="cursor-pointer"
              disabled={loading}
              onClick={() => {
                handleLogin();
              }}
            >
              {loading ? "Logging in..." : "Login"}
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
