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
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { logInApi, otpVerifyApi, signUpApi } from "../../@core/api/api";

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
      </div>
    </CardContent>
  );
};

export function AppSignup() {
  const [Email, setEmail] = useState("");
  const [FullName, setFullName] = useState("");
  const [UserName, setUserName] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();


  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const sendOtp = useMutation({
    mutationFn: async () => {
      return logInApi({ email: Email });
    },
    onSuccess: (msg: any) => {
      toast.success(
        msg?.response?.data?.message || "OTP sent! Check your inbox.",
        { richColors: true }
      );

      setShowOTP(true);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "OTP sending failed", {
        richColors: true,
      });
      // console.log("error object", err);
      // console.log("response", err?.response);
      // console.log("data", err?.response?.data);
    },
  });

  const emailformat = () => {
    if (!Email) {
      return toast.error("Please enter an email", { richColors: true });
    }
    if (!emailCheck.test(Email)) {
      return toast.error("Please valid email formate", { richColors: true });
    }
    sendOtp.mutate();
  };

  const OTPCheck = useMutation({
    mutationFn: async () => {
      if (OTP.length < 6) {
        toast.error("Please enter full OTP", { richColors: true });
        throw new Error("otp too short");
      }
      return otpVerifyApi({
        email: Email,
        otp: OTP,
      });
    },

    onSuccess: () => {
      toast.success("Verified", { richColors: true });
      setShowUserName(true);
      setShowOTP(false);
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Invalid OTP", {
        richColors: true,
      });
    },
  });

  const createAccount = useMutation({
    mutationFn: async () => {
      return signUpApi({
        email: Email,
        userName: UserName,
        fullName: FullName,
      });
    },

    onSuccess: (res) => {
      toast.success("Account has been created!", { richColors: true });
      console.log("signup response:", res.data);
      setShowUserName(false);

      navigate("/dashboard");
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Signup failed", {
        richColors: true,
      });
    },
  });

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
              gap-
            "
        >
          {showUserName ? (
            <CardContent className="flex flex-col gap-2">
              <CardTitle>User Name</CardTitle>
              <Input
                type="text"
                name="userName"
                placeholder="enter your username here"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
              />

              <CardTitle>Full Name</CardTitle>
              <Input
                type="text"
                name="fullName"
                placeholder="enter your full name here"
                value={FullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </CardContent>
          ) : showOTP && Email ? (
            <OTPSection OTP={OTP} setOTP={setOTP} />
          ) : (
            <CardContent className="flex flex-col gap-2">
              <CardTitle>Email</CardTitle>
              <Input
                type="email"
                name="email"
                placeholder="enter email here"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </CardContent>
          )}

          <CardContent
            className="
              flex flex-col
              gap-2 
            "
          >
            {showUserName ? (
              <CardDescription>
                <Button
                  className="cursor-pointer w-full"
                  onClick={() => createAccount.mutate()}
                  disabled={createAccount.isPending}
                >
                  Done
                </Button>
              </CardDescription>
            ) : showOTP && Email ? (
              <Button
                className="cursor-pointer"
                onClick={() => {
                  OTPCheck.mutate();
                }}
                disabled={OTPCheck.isPending}
              >
                Verify
              </Button>
            ) : (
              <Button
                className="cursor-pointer"
                onClick={() => {
                  emailformat();
                }}
                disabled={sendOtp.isPending}
              >
                Request OTP
              </Button>
            )}

            <CardDescription className="self-center">or</CardDescription>

            <Button
              className="
                cursor-pointer
              "
            >
              Signup with Google
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
