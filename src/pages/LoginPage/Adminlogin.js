
import React, { useState } from "react";
import footer from '../../components/Footer'
import "./LoginPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthTemplate from "../Common/AuthTemplate";
import { useNavigate } from "react-router-dom";
import google from "./Images/Google.svg";
import facebook from "./Images/Facebook.svg";
import { endpoints } from "../services/apis";
import {
  makeUnauthenticatedPOSTRequest,
} from "../services/serverHelper";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setRole,
  setRefreshToken,
} from "../reducer/slices/authSlice";
import Footer from "../../components/Footer";
import logo from '../../assets/ek-logo.png';

import art1 from '../../assets/admin login/7.png'
import art2 from '../../assets/admin login/photo_60_2025-04-25_09-16-33.jpg'
import art3 from '../../assets/admin login/3.png'
import art4 from '../../assets/admin login/10.png'
import art5 from '../../assets/admin login/5.png'
import art6 from '../../assets/admin login/WhatsApp Image 2025-05-12 at 16.13.50_a742b1fb.jpg'
import art7 from '../../assets/admin login/4.png'
import art8 from '../../assets/admin login/WhatsApp Image 2025-06-06 at 15.59.08_bf418246.jpg'
import art9 from '../../assets/admin login/8.png'

import mandala from '../../assets/wallpaper.png'

export function AdminLoginPage() {
  const dispatch = useDispatch();

  const artImages = [art1, art2, art3, art4, art5, art6, art7, art8, art9];

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

 
const Otp_Send = async ( email) => {
    try {
     const responce = await fetch(endpoints.REGISTER_OTP_SEND,{
      method:"POST",
      headers:{
        "content-Type":"application/json",
      },
      body:JSON.stringify({
        email,
      })
    } )
    if(responce.status === 200){
      toast.success("Otp has been send... " , {
            position:"top-center"
          });
    }
    }catch (error) {
    console.log(error);
    toast.error(error);
    
  }

}
const submitHandler = async (event) => {
  event.preventDefault();
  const toastId = toast.loading("Loading...");

  try {
    const response = await makeUnauthenticatedPOSTRequest(
      endpoints.LOGIN_API,
      { ...formData, registerBy: "email" }
    );

    console.log("Login response:", response); // Debug log

    // Handle successful login
    // if (response.status === "success") {
    //   const { accessToken, refreshToken, role } = response.data;

    if (response.status === "success") {
  const { accessToken, refreshToken, role } = response.data;

  // ✅ Allow only Admin login
  if (role !== "Admin") {
    toast.update(toastId, {
      render: "Only Admins can login here",
      type: "error",
      isLoading: false,
      autoClose: 5000,
      position: "top-center",
    });
    return;
  }

  dispatch(setAccessToken(accessToken));
  dispatch(setRefreshToken(refreshToken));
  dispatch(setRole(role));
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("role", role);

  toast.update(toastId, {
    render: "Successfully logged in",
    type: "success",
    isLoading: false,
    autoClose: 5000,
    position: "top-center",
  });

  navigate("/AdminDashboard");
  return;
}

    // Handle errors from response
    if (response.status === "error") {
      const message = response.message?.toLowerCase();

      if (message?.includes("invalid") || message?.includes("credentials")) {
        toast.update(toastId, {
          render: "Wrong password. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          position: "top-center",
        });
        return;
      }

      if (response.message === "User is not verified. Please complete the verification process.") {
        await Otp_Send(formData.email);
        toast.dismiss(toastId);
        navigate(`/verifyCode/${formData.email}`);
        return;
      }

      toast.update(toastId, {
        render: response.message || "Login failed",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        position: "top-center",
      });
      return;
    }
  } catch (error) {
    console.error("Login error:", error);

    if (error.response?.status === 401) {
      toast.update(toastId, {
        render: "Invalid email or password",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        position: "top-center",
      });
    } else {
      toast.update(toastId, {
        render: error.message || "Internal server error",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        position: "top-center",
      });
    }
  }
};


  const googleLogin = async () => {
    navigate("https://api.ekalakaar.com/api/auth/google/");
    // try {
    //   const response = await makeUnauthenticatedGETRequest(
    //     artistProfilePoints.LOGIN_WITH_GOOGLE_API
    //   );
    //   console.log("googleRes", response);
    // } catch (error) {
    //   toast.error("Something went wrong , please try again");
    //   console.log(error);
    // }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
  <>
    <div className="!bg-[#FFFCF2] min-h-screen flex flex-col justify-center">

      {/* Top Right Mandala - Hidden on small screens */}
      <div className="hidden md:block">
        <img
          src={mandala}
          alt="Mandala Top Right"
          className="absolute 
            top-[-3rem] md:top-[-2rem] lg:top-[-5rem] xl:top-[-7rem] 
            left-[-5rem] md:left-[-6rem] lg:left-[-6rem] xl:left-[-7rem]
            w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
            opacity-[0.7] z-0"
        />
      </div>

      <div className="flex flex-col lg:flex-row w-full min-h-screen items-center justify-center px-4 py-10">
        
        {/* Left - Login Form */}
        <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end p-4">
          <div className="w-full max-w-[380px] h-auto border border-[#AD2F3B] rounded-xl p-6 flex flex-col justify-between shadow-[0_0_15px_4px_rgba(173,47,59,0.4)] bg-white">
            
            {/* Logo & Heading */}
            <div className="flex flex-col items-center mb-4">
              <img src={logo} alt="eKalakaar Logo" className="w-[134px] mb-2" />
              <h2 className="text-base sm:text-lg font-semibold text-[#AD2F3B] text-center">
                Sign in to eKalakaar!
              </h2>
            </div>

            {/* Form */}
            <form
              onSubmit={submitHandler}
              className="flex flex-col gap-3 text-sm"
            >
              {/* Email */}
              <div>
                <label className="text-sm font-medium">Enter your email</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    required
                    onChange={changeHandler}
                    value={formData.email}
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#AD2F3B]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium">Enter your password</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    required
                    onChange={changeHandler}
                    value={formData.password}
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#AD2F3B]"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <i className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-center text-xs text-gray-600">
                <span
                  className="text-[#AD2F3B] cursor-pointer"
                  onClick={() => navigate("/forgetPassword")}
                >
                  Forgot password?
                </span>
              </div>

              {/* Sign in Button */}
              <button
                type="submit"
                className="w-full bg-[#AD2F3B] text-white py-2 rounded-full font-semibold hover:bg-[#932530]"
              >
                Sign in
              </button>

              {/* Sign up */}
              <p className="text-center text-xs">
                Don’t have an account?
                <span
                  className="text-[#AD2F3B] font-medium cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  {" "}Sign up
                </span>
              </p>

              {/* Divider */}
              <div className="text-center text-xs text-gray-400 mt-2">or sign in with</div>

              {/* Social Logins */}
              <div className="flex flex-col gap-2 mt-1">
                <button
                  onClick={googleLogin}
                  className="w-full border rounded-md py-2 flex items-center justify-center gap-2 text-sm"
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                    className="h-4"
                  />
                  Sign in with Google
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right - Image Grid (hidden on smaller than lg) */}
        <div className="hidden lg:flex lg:w-[55%] items-center justify-center p-4">
          <div className="grid grid-cols-3 gap-1.5 h-[500px] w-full max-w-lg">
            {artImages.map((imgSrc, index) => (
              <div
                key={index}
                className="rounded-md overflow-hidden bg-gray-200"
              >
                <img
                  src={imgSrc}
                  alt={`Art ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  </>
);

}
