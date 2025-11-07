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

interface UserNameSectionProps {
  UserName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  FullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
}

const UserNameSection: React.FC<UserNameSectionProps> = ({
  UserName,
  setUserName,
  FullName,
  setFullName,
}) => {
  return (
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

  const HandleSignup = () => {
    if (!Email /*|| !Password*/) {
      toast.error("Please fill all the fileds", { richColors: true });
      return;
    } else if (!emailCheck.test(Email)) {
      toast.error("enter a valid email formate", { richColors: true });
      // } else if (Password.length < 8) {
      //   toast.error("password must be atleast 8-digit", { richColors: true });
    } else {
      toast.success("Sent OTP to your account", { richColors: true });
      setShowOTP(true);
    }
  };

  const successHandler = () => {
    if (!FullName || !UserName) {
      toast.error("Please fill all the fields", { richColors: true });
      return;
    } else {
      toast.success("Account Created Successfully!", { richColors: true });
    }
  };

  const VerifyHandler = () => {
    if (OTP.length < 6) {
      toast.error("Please enter full OTP", { richColors: true });
      return;
    } else {
      toast.success("Verified!", { richColors: true });
      setShowUserName(true);
      setShowOTP(false);
    }
  };

  const RequestOTP = () => {
    return (
      <Button
        className="cursor-pointer"
        onClick={() => {
          HandleSignup();
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
          VerifyHandler();
        }}
      >
        Verify
      </Button>
    );
  };

  const DoneButton = () => {
    return (
      <CardDescription>
        <Button className="cursor-pointer w-full" onClick={successHandler}>
          Done
        </Button>
      </CardDescription>
    );
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
            gap-
          "
        >
          <CardContent
            className="
              flex flex-col
              gap-2
            "
          >
            {showUserName ? (
              <UserNameSection
                UserName={UserName}
                setUserName={setUserName}
                FullName={FullName}
                setFullName={setFullName}
              />
            ) : showOTP && Email ? (
              <OTPSection OTP={OTP} setOTP={setOTP} />
            ) : (
              <EmailSection Email={Email} setEmail={setEmail} />
            )}
          </CardContent>
          <CardContent
            className="
              flex flex-col
              gap-2 
            "
          >
            {/* <Button
              onClick={HandleSignup}
              className="
                cursor-pointer
              "
            >
              Request OTP
            </Button> */}
            {showUserName ? (
              <DoneButton />
            ) : showOTP && Email ? (
              <VerifyButton />
            ) : (
              <RequestOTP />
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
