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
import { useState } from "react";
import { toast } from "sonner";
import { signUpApi } from "../../@core/api/api";
import { userAuthStore } from "../../store/userAuthStore";

export function NewAppSignup() {
  const [Email, setEmail] = useState("");
  const [FullName, setFullName] = useState("");
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = userAuthStore((state) => state.setUser);

  const createAccount = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!Email) return toast.error("Please enter an email", { richColors: true });
    if (!emailRegex.test(Email)) return toast.error("Please enter a valid email format", { richColors: true });
    if (!password) return toast.error("Please enter a password", { richColors: true });
    if (!passwordRegex.test(password)) return toast.error("Use 6+ chars, including a letter and number", { richColors: true });
    if (!UserName) return toast.error("Please enter a username", { richColors: true });
    if (!FullName) return toast.error("Please enter your full name", { richColors: true });

    try {
      const res = await signUpApi({ email: Email, userName: UserName, fullName: FullName, password });
      const user = res?.data?.user;
      if (!user) return toast.error(res?.data?.message || "Signup failed", { richColors: true });
      setUser(user, res?.data?.token);
      toast.success("Account has been created!", { richColors: true });
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Signup failed", { richColors: true });
    }
  };

  return (
    <>
      <Card className="md:flex md:flex-col md:gap-5 md:w-[28%] md:bg-gray-100 w-[80%]">
        <CardHeader>
          <CardTitle className="text-2xl">Lets Get started with us!</CardTitle>
          <CardDescription>Fill all the fields to create your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CardContent className="flex flex-col gap-2">
            <CardTitle>Email</CardTitle>
            <Input
              type="email"
              placeholder="enter email here"
              autoFocus
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); createAccount(); } }}
            />
            <CardTitle>User Name</CardTitle>
            <Input
              type="text"
              placeholder="enter your username here"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); createAccount(); } }}
            />
            <CardTitle>Full Name</CardTitle>
            <Input
              type="text"
              placeholder="enter your full name here"
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); createAccount(); } }}
            />
            <CardTitle>Password</CardTitle>
            <Input
              type="password"
              placeholder="enter password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); createAccount(); } }}
            />
          </CardContent>
          <CardContent className="flex flex-col gap-2">
            <Button className="cursor-pointer" onClick={createAccount}>Signup</Button>
            <CardDescription className="self-center">or</CardDescription>
            <Button className="cursor-pointer">Signup with Google</Button>
            <div className="flex gap-1 self-center">
              <CardDescription>Already have an account?</CardDescription>
              <NavLink to="/">
                <CardDescription className="hover:underline text-black">Login</CardDescription>
              </NavLink>
            </div>
          </CardContent>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}