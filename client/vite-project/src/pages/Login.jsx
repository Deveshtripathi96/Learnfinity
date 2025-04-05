
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [SignupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [LoginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [registerUser, { data: registerData, error: registerError, isLoading: registerisLoading, isSuccess: registerSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsloading, isSuccess: loginSuccess }] = useLoginUserMutation();

  const handler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const testhandle = async(type) => {
    const inputdata = (type === "signup") ? SignupInput : LoginInput;

    const action=(type==="signup")?registerUser:loginUser;

    await action(inputdata);


    console.log(inputdata);
  }
  useEffect(()=>{
    if(registerError){
      toast.error(registerData.data.message || "Signup Failed");
    }
    if(loginError){
      toast.error(loginData.data.message || "Login Failed");
    }
    if(registerSuccess && registerData){
      toast.success(registerData.message || "SignUp Successfull")
    }
    if(loginSuccess && loginData){
      toast.success(loginData.message || "Login Successfull")
    }


  },[loginIsloading,registerisLoading,loginData,registerData,loginError,registerError])

  return (
    <Tabs defaultValue="signup" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>

      {/* Signup Form */}
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create a new account to get started.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={SignupInput.name}
                onChange={(e) => handler(e, "signup")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={SignupInput.email}
                onChange={(e) => handler(e, "signup")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={SignupInput.password}
                onChange={(e) => handler(e, "signup")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={registerisLoading} onClick={() => { testhandle("signup") }}>
              {
                registerisLoading?(
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
                  </>
                ):"Signup"
              }
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Login Form */}
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to log in.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={LoginInput.email}
                onChange={(e) => handler(e, "login")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={LoginInput.password}
                onChange={(e) => handler(e, "login")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={loginIsloading}  onClick={() => { testhandle("login") }}>
             {loginIsloading ?(
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait
              </>
              
             ):"Login"
            }

            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Login;
