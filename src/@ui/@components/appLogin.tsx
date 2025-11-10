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

interface OTPSectionProps {
  OTP: string;
  setOTP: React.Dispatch<React.SetStateAction<string>>;
}

const OTPSection: React.FC<OTPSectionProps> = ({ OTP, setOTP }) => {
  return (
    <CardContent className="flex flex-col gap-3">
      <CardTitle>OTP</CardTitle>
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

interface EmailSectionProps {
  Email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const EmailSection: React.FC<EmailSectionProps> = ({ Email, setEmail }) => {
  return (
    <CardContent className="flex flex-col gap-2">
      <CardTitle>Email</CardTitle>
      <Input
        type="email"
        placeholder="enter email here"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </CardContent>
  );
};

export function AppLogin() {
  const [Email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState("");
  // const [Password, setPassword] = useState("");
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const Handlelogin = () => {
    if (!Email /* || !Password */) {
      toast.error("Please fill all the fields", { richColors: true });
      return;
    } else if (!emailCheck.test(Email)) {
      toast.error("enter a valid email format", { richColors: true });
      // } else if (Password.length < 8) {
      //   toast.error("password must be atleast 8-digit", { richColors: true });
    } else {
      toast.success("Sent OTP to your email", { richColors: true });
      setShowOTP(true);
    }
  };

  const LoadingHandler = () => {
    if (OTP.length < 6) {
      toast.error("Please enter full OTP", { richColors: true });
      return;
    } else toast.success("Loading...", { richColors: true });
  };

  // const EmailSection = () => {
  //   return (
  //     <CardContent className="flex flex-col gap-3">
  //       <CardTitle>Email</CardTitle>
  //       <Input
  //         type="email"
  //         placeholder="enter email here"
  //         value={Email}
  //         onChange={(e) => {
  //           setEmail(e.target.value);
  //         }}
  //       ></Input>
  //     </CardContent>
  //   );
  // };

  const RequestOTP = () => {
    return (
      <Button
        className="cursor-pointer"
        onClick={() => {
          Handlelogin();
        }}
      >
        Request OTP
      </Button>
    );
  };

  const VerifyButton = () => {
    return (
      <Button
        className="cursor-pointer"
        onClick={() => {
          LoadingHandler();
        }}
      >
        Verify
      </Button>
    );
  };

  return (
    <>
      <Card
        className="
                md:flex md:flex-col md:gap-3 md:w-[28%] md:bg-gray-100
                w-[80%]
        
        "
      >
        <CardHeader>
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>
            Use your Credential to get in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CardContent className="flex flex-col gap-3">
            {showOTP && Email ? (
              <OTPSection OTP={OTP} setOTP={setOTP} />
            ) : (
              <EmailSection Email={Email} setEmail={setEmail} />
            )}
          </CardContent>
          <CardContent className="flex flex-col gap-2">
            {showOTP && Email ? <VerifyButton /> : <RequestOTP />}
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
