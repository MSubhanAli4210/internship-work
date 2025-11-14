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
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

// const navigate = useNavigate();

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
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailformat = () => {
    if (!Email) {
      return toast.error("Please enter an email", { richColors: true });
    }
    if (!emailCheck.test(Email)) {
      return toast.error("Please valid email formate", { richColors: true });
    }
    sendOtp.mutate();
  };

  const createAccount = () => {
    if (!FullName || !UserName) {
      toast.error("Please fill all the fields", { richColors: true });
      return;
    } else {
      toast.success("Account Created Successfully!", { richColors: true });
    }
  };

  const OTPCheck = useMutation({
    mutationFn: async () => {
      if (OTP.length < 6) {
        toast.error("Please enter full OTP", { richColors: true });
        return;
      } else toast.success("Verified", { richColors: true });
      setShowUserName(true);
      setShowOTP(false);
    },
  });

  const sendOtp = useMutation({
    mutationFn: async () => {
      // const res = await getEmail();
      // return res.json();
    },
    onSuccess: () => {
      toast.success("OTP sent! Check you inbox.", { richColors: true });
      setShowOTP(true);
    },

    onError: () => {
      toast.error("faild to send otp", { richColors: true });
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
                placeholder="enter your username here"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <CardTitle>Full Name</CardTitle>
              <Input
                type="text"
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
                  onClick={createAccount}
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
