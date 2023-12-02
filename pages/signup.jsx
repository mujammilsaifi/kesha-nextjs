import { useAuth } from "@/context/Auth";
import { useCart } from "@/context/Cart";
import { useTopLoadingBar } from "@/context/TopLoadingBar";
import axios from "axios";

import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";


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
  const [emailErr, setEmailErr] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginMode, setLoginMode] = useState(false);
  const [isForgotPassword, setForgotPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(true);
  const [otp, setOtp] = useState('');
  const [emailverify, setEmailverify] = useState(false);

  const [userOtp, setUserOtp] = useState(false);
  const [repass, setRepass] = useState(false);
  const [emailOTP, setEmailOTP] = useState('');
  const [formValidate, setValidateForm] = useState(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);
  const [loginErr, setLoginErr] = useState('');

  

  const forSignupAPI = async () => {
    setLoginMode(false);
    setIsSignup(true)
    setTopLoading(40);    
    try {
      
        const { data } = await axios.post(`/api/signup`, {
          name,
          email,
          password
        });
        if (data?.success) {
          setTopLoading(100)
          setLoginMode(true);
        } else {
          setLoginMode(false);
          setTopLoading(100)
          toast.error(data.message);
        }
      
    } catch (error) {
      console.log(error);
    }
  };
const verifyEmail=()=>{
    
  if(otp==emailOTP){
    forSignupAPI();    
  }else{
    toast.success("OTP is not Correct!")
  }
}
const handleSignup=async()=>{
  if(!name || !email || !password || !confirmPassword){
    setValidateForm(true);    
  }else if (confirmPassword != password) {
    setValidateForm(false);
    setConfirmPasswordErr(true);
    setTimeout(() => {
      setConfirmPasswordErr(false);
    }, 3000);
  }else{
  const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  setEmailOTP(otp);
  try {
    const { data } = await axios.post(`/api/verifyemail`, {email,otp});
    if(data?.success){
      setIsSignup(false)
      setForgotPassword(false)
      setEmailverify(true)
    }
  } catch (error) {
    toast.error(error)
  }
  }
}

  const handleLogin = async () => {
    setTopLoading(40)    
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
        setLoginErr(data?.message);
      }
      setTimeout(() => {
        setLoginErr('');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  // GET OTP FOR RESET PASSWORD
  const handleForgotPassword = async() => {
    
    try {
      if(email===''){
        setEmailErr(true)
        setTimeout(() => {
          setEmailErr(false)
        }, 3000);
    }else{
        const { data } = await axios.post(`/api/otpforgetpassword/getotp`, { email});
        if (data?.success) {
          toast.success(data?.message)
          setUserOtp(true)
          isSignup(false)
          setForgotPassword(false)
          
        }else{
          toast.error(data?.message)
        }
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
                <label >Email</label>
                {emailErr && <p className='text-red-500'>Email is Required</p>}
                < input required
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-[f0f0f0] px-4 py-2 rounded mb-4  "
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
                {!isLoginMode && (<>
                  {formValidate && <p className='text-red-500 text-center'>Fill All Required Fields</p>}
                  <label >Name:</label>
                  < input required
                    type="text"
                    placeholder="Name"
                    className="w-full border border-[f0f0f0] px-4 py-2 rounded mb-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  /></>
                )}
                {loginErr && <p className='text-red-500 text-center text-2xl'>{loginErr}</p>}
                <label >Email:</label>                
                < input required
                  type="email"
                  placeholder="Email"
                  className="w-full border border-[f0f0f0] px-4 py-2 rounded mb-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label >Password:</label>
                < input required
                  type="password"
                  placeholder="Password"
                  className="w-full border-[f0f0f0] border px-4 py-2 rounded mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isLoginMode &&  (
                  <>
                  <label >Confirm Password:</label>
                  {confirmPasswordErr && <p className='text-red-500 '>Password does not match</p>}
                    < input required
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full border-[f0f0f0] border px-4 py-2 rounded mb-4"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    
                  </>
                )}
                {isLoginMode ? (<>
                  <button
                    className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  {/* <button
                    className="bg-blue-500 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => alert("google login")}
                  >
                    Continue With Google
                  </button> <br /> */}</>
                ) : (
                  <button
                    className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </button>
                )}
                <button
                  className="mt-4 text-sm text-blue-500 cursor-pointer"
                  onClick={() => setLoginMode(!isLoginMode)}
                >
                  {isLoginMode
                    ? "Create an account?"
                    : "Already have an account? LOGIN"}
                </button>
                {isLoginMode && (<>
                  <br /><button
                    className="mt-2 text-sm text-gray-500 cursor-pointer"
                    onClick={() => setForgotPassword(true)}
                  >
                    Forgot Password?
                  </button></>
                )}
                
              </div>
            )}
          </div>
        </div>
      )}
      {emailverify && (
              <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="bg-white p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
                  <h2 className="text-2xl font-semibold mb-4">Enter OTP. Recived on Your Email</h2>
                  < input required
                    type="number"
                    placeholder="OTP"
                    className="w-full px-4 py-2 rounded mb-4 border"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
                    onClick={verifyEmail}
                  >
                    Submit
                  </button>
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
