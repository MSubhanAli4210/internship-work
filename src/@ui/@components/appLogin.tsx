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
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { logInApi, otpVerifyApi } from "../../@core/api/api";

interface OTPSectionProps {
  OTP: string;
  setOTP: React.Dispatch<React.SetStateAction<string>>;
}

const OTPSection: React.FC<OTPSectionProps> = ({ OTP, setOTP }) => {
  return (
    <CardContent className="flex flex-col gap-3">
      <CardTitle className="self-center">Verify OTP</CardTitle>
      <CardDescription className="self-center">
        Enter the OTP sent to your email
      </CardDescription>
      <div className="flex justify-center">
        <InputOTP name="otp" maxLength={6} value={OTP} onChange={setOTP}>
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
      </div>
    </CardContent>
  );
};

export function AppLogin() {
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState("");
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();


  const emailformat = () => {
    if (!Email) {
      return toast.error("Please enter an email", { richColors: true });
    }
    if (!emailCheck.test(Email)) {
      return toast.error("Please valid email formate", { richColors: true });
    }
    sendOtp.mutate();
  };

  const sendOtp = useMutation({
    mutationFn: async () => {
      return await logInApi({ email: Email });
    },
    onSuccess: () => {
      toast.success("OTP sent! Check you inbox.", { richColors: true });
      setShowOTP(true);
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "OTP sending failed", {
        richColors: true,
      });
    },
  });

  const OTPCheck = useMutation({
    mutationFn: async () => {
      if (OTP.length < 6) {
        toast.error("Please enter full OTP", { richColors: true });
        return;
      }
      return await otpVerifyApi({
        email: Email,
        otp: OTP,
      });
    },
    onSuccess: () => {
      toast.success("Verified", { richColors: true });
      setShowOTP(false);

      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Invalid OTP", { richColors: true });
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
          {showOTP && Email ? (
            <OTPSection OTP={OTP} setOTP={setOTP} />
          ) : (
            <CardContent className="flex flex-col gap-2">
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
