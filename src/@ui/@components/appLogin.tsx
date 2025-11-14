import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
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
import { toast } from "sonner";
import { useState } from "react";
import { useMutation} from "@tanstack/react-query";

export function AppLogin() {
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState("");
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [Email, setEmail] = useState("");

  const emailformat = ()=>{
    if(!Email){
      return toast.error("Please enter an email", {richColors: true});
    }
    if(!emailCheck.test(Email)){
      return toast.error("Please valid email formate",{richColors:true});
    }
    sendOtp.mutate();
  }

  const sendOtp = useMutation({
    mutationFn:
     async () => {
      // const res = await getEmail();
      // return res.json();
    },
    onSuccess: ()=>{
      toast.success("OTP sent! Check you inbox.",{richColors:true});
      setShowOTP(true);
    },

    onError: ()=>{
      toast.error("faild to send otp",{richColors:true});
    }

  });


  const OTPCheck = useMutation({
    mutationFn: async () => {
      if (OTP.length < 6) {
        toast.error("Please enter full OTP", { richColors: true });
        return;
      } else toast.success("Verified", { richColors: true });
    },
  });

  return (
    <>
      <Card className=" md:flex md:flex-col md:gap-3 md:w-[28%] md:bg-gray-100 w-[80%] ">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>
            Use your Credential to get in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          {showOTP && Email ? (
            <CardContent className="flex flex-col items-center gap-3">
              <CardTitle className="text-2xl font-bold">Enter-OTP</CardTitle>
              <InputOTP maxLength={6} value={OTP} onChange={setOTP}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </CardContent>
          ) : (
            <CardContent className="flex flex-col gap-3">
              <CardTitle>Email</CardTitle>
              <Input
                type="email"
                placeholder="enter email here"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Input>
            </CardContent>
          )}
          <CardContent className="flex flex-col gap-2">
            {showOTP && Email ? (
              <Button
                className="cursor-pointer"
                onClick={() => {
                  OTPCheck.mutate();
                }}
              >
                Verify
              </Button>
            ) : (
              <Button
                className="cursor-pointer"
                onClick={() => {
                  emailformat();
                }}
              >
                Request OTP
              </Button>
            )}
            <CardDescription className="self-center">or</CardDescription>
            <Button className="text-black bg-gray-300 hover:text-white cursor-pointer">
              Login with Google
            </Button>
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
