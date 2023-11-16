import { useAuth } from "@/context/Auth";
import { useCart } from "@/context/Cart";
import { useTopLoadingBar } from "@/context/TopLoadingBar";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const API = process.env.NEXT_PUBLIC_APP_API_URL;

function Signup() {
    const[loading,setTopLoading] =useTopLoadingBar();
    const router = useRouter();
    const [cart] = useCart();
    const [auth, setAuth] = useAuth();
    if (auth?.token) {
      if (cart?.length > 0) {
        router.push("/cart");
      } else {
        router.push("/");
      }
    }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginMode, setLoginMode] = useState(false);
  const [isForgotPassword, setForgotPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(true);
  const [otp, setOtp] = useState('');

  const [userOtp, setUserOtp] = useState(false);
  const [repass, setRepass] = useState(false);

  

  const handleSignup = async () => {
    setTopLoading(40)
    // Add your signup logic here
    // alert(`${name} ${email}${password} ${confirmPassword} ${phone}${address}`)
    try {
      if (confirmPassword == password) {
        const { data } = await axios.post(`/api/signup`, {
          name,
          email,
          password
        });
        if (data?.success) {
          setTopLoading(100)
          toast.success(data.message);
        } else {
          setTopLoading(100)
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    setTopLoading(40)
    // alert(` ${email}${password} `)
    try {
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      if (data?.success) {
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        setTopLoading(100)
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("User login successfully");
        router.push(location.state);
      }else{
        setTopLoading(100)
        toast.error(data?.message);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  // GET OTP FOR RESET PASSWORD
  const handleForgotPassword = async() => {
    try {
        const { data } = await axios.post(`/api/otpforgetpassword/getotp`, { email});
        if (data?.success) {
          toast.success(data?.message)
          setUserOtp(true)
          isSignup(false)
          setForgotPassword(false)
          
        }else{
          toast.error(data?.message)
        }
    } catch (error) {
      console.log(error);
    }
  };
  const verifyOTP = async() => {
    try {
      const { data } = await axios.post(`/api/otpforgetpassword/verifyotp`, { email,otp});
      if (data?.success) {
        setRepass(true)
        setUserOtp(false)
        setIsSignup(false)
        setForgotPassword(false)
        toast.success(data?.message)
      }else{
        toast.error(data?.message)
      }
  } catch (error) {
    console.log(error);
  }
  }
  const resetPassword = async() => {
    try {
      const { data } = await axios.post(`/api/otpforgetpassword/resetpassword`, { email,password});
      if (data?.success) {
        toast.success(data?.message)
        setLoginMode(true)
        setIsSignup(true)
        setRepass(false)
      }else{
        toast.error(data?.message)
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      {!userOtp && isSignup &&(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="bg-white p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3 mt-[110px]">
            {isForgotPassword ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
                < input required
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded mb-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
                  onClick={handleForgotPassword}
                >
                  Reset Password
                </button>
                <p
                  className="mt-4 text-sm text-gray-500 cursor-pointer"
                  onClick={() => setForgotPassword(false)}
                >
                  Return to Login
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  {isLoginMode ? "Login" : "Sign Up"}
                </h2>
                {!isLoginMode && (
                  < input required
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 rounded mb-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                < input required
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded mb-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                < input required
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isLoginMode &&  (
                  <>
                    < input required
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full px-4 py-2 rounded mb-4"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    
                  </>
                )}
                {isLoginMode ? (
                  <button
                    className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </button>
                )}
                <p
                  className="mt-4 text-sm text-gray-500 cursor-pointer"
                  onClick={() => setLoginMode(!isLoginMode)}
                >
                  {isLoginMode
                    ? "Create an account"
                    : "Already have an account?"}
                </p>
                {!isLoginMode && (
                  <p
                    className="mt-2 text-sm text-gray-500 cursor-pointer"
                    onClick={() => setForgotPassword(true)}
                  >
                    Forgot Password?
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {userOtp && isSignup &&(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="bg-white p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Verify your OTP</h2>
            < input required
              type="number"
              placeholder="OTP"
              className="w-full px-4 py-2 rounded mb-4 border"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
              onClick={verifyOTP}
            >
              Verify
            </button>
          </div>
        </div>
      )}
      {repass && (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="bg-white p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Set New Password</h2>
            < input required
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded mb-4 border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            < input required
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded mb-4 border"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
              onClick={resetPassword}
            >
              Set password
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
