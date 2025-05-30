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
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/features/authSlice"; // ✅ import it

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [registerUser, { data: registerData, error: registerError, isLoading: isRegistering, isSuccess: registerSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: isLoggingIn, isSuccess: loginSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
     console.log("Submitting:", type, inputData); // 👈 Add this
    // Validation
    if (Object.values(inputData).some((val) => !val)) {
      toast.error("Please fill in all fields.");
      return;
    }

    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  // useEffect(() => {
  //   if (registerError) {
  //     toast.error(registerError?.data?.message || "Signup Failed");
  //   }
  //   if (loginError) {
  //     toast.error(loginError?.data?.message || "Login Failed");
  //   }
  //   if (registerSuccess && registerData) {
  //     toast.success(registerData.message || "Signup Successful");
  //     setSignupInput({ name: "", email: "", password: "" });
  //     navigate("/");
  //   }
  //   if (loginSuccess && loginData) {
  //     toast.success(loginData.message || "Login Successful");
  //     setLoginInput({ email: "", password: "" });
  //     navigate("/");
  //   }
  // }, [registerError, loginError, registerSuccess, loginSuccess]);
  const dispatch = useDispatch();

useEffect(() => {
  if (registerError) {
    toast.error(registerError.data.message || "Signup Failed");
  }

  if (loginError) {
    toast.error(loginError.data.message || "Login Failed");
  }

  if (registerSuccess && registerData) {
    dispatch(userLoggedIn({ user: registerData.user })); // ✅ update store
    toast.success(registerData.message || "Signup Successful");
    setSignupInput({ name: "", email: "", password: "" });
    navigate("/");
  }


  if (loginSuccess && loginData) {
   
    
    dispatch(userLoggedIn({ user: loginData.user })); // ✅ update store
    toast.success(loginData.message || "Login Successful");
    setLoginInput({ email: "", password: "" });
    navigate("/");
  }
}, [registerError, loginError, registerSuccess, registerData, loginSuccess, loginData, dispatch, navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
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
                  value={signupInput.name}
                  onChange={(e) => handleInputChange(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={signupInput.email}
                  onChange={(e) => handleInputChange(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={signupInput.password}
                  onChange={(e) => handleInputChange(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={isRegistering} onClick={() => handleSubmit("signup")}>
                {isRegistering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Signup"
                )}
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
                <Label htmlFor="loginEmail">Email</Label>
                <Input
                  id="loginEmail"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginInput.email}
                  onChange={(e) => handleInputChange(e, "login")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                  id="loginPassword"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginInput.password}
                  onChange={(e) => handleInputChange(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={isLoggingIn} onClick={() => handleSubmit("login")}>
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
