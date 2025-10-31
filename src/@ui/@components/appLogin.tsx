import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

export function AppLogin() {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const emailCheck=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const Handlelogin =()=>{
         if (!Email || !Password) {
            toast.error("Please fill all the fileds", {richColors:true})
            return;
        }

        else if(!emailCheck.test(Email)){
            toast.error("enter a valid email formate", {richColors:true})
        }

        else if(Password.length<8){
            toast.error("password must be atleast 8-digit", {richColors:true})
        }

        else toast.success("Loged in to your account", {richColors:true})

    }

    return (<>


        <Card className="
                md:flex md:flex-col md:gap-3 md:w-[28%] md:bg-gray-100
                w-[80%]
        
        ">
            <CardHeader>
                <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                <CardDescription>Use your Credential to get in to your account</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
                <CardContent className="flex flex-col gap-3">
                    <CardTitle>Email</CardTitle>
                    <Input type="email" placeholder="enter email here" onChange={(e)=>{setEmail(e.target.value)}}></Input>
                    <CardTitle>Password</CardTitle>
                    <Input type="password" placeholder="enter password here" onChange={(e)=>{setPassword(e.target.value)}}></Input>
                    <CardDescription className="hover:underline self-end cursor-pointer">Forgot password?</CardDescription>
                </CardContent>
                <CardContent className="flex flex-col gap-3">
                    <Button className="cursor-pointer" onClick={Handlelogin}>Login</Button>
                    <Button className="text-black bg-gray-300 hover:text-white cursor-pointer">Login with Google</Button>
                    <div className="flex gap-1 self-center">
                    <CardDescription>Don't have a account?</CardDescription>
                    <NavLink to='/create-new-account'><CardDescription className="hover:underline text-black">Signup</CardDescription></NavLink>
                    </div>
                </CardContent>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>

    </>)
}