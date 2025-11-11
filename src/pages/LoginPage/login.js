// import React, { useState,  useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { endpoints } from "../services/apis";
// import { makeUnauthenticatedPOSTRequest } from "../services/serverHelper";
// import { useDispatch } from "react-redux";
// import {
//   setAccessToken,
//   setRole,
//   setRefreshToken,
// } from "../reducer/slices/authSlice";

// import logo from "../../assets/ek-logo.png";
// import loginPage from "../../assets/Untitled design (2).png";
// import Footer from "../../components/Footer";

// export function LoginPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     phoneNumber: {
//       countryCode: "+91",
//       number: "",
//     },
//   });

//   const [otp, setOtp] = useState("");
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   // Forgot password states
//   const [showForgotModal, setShowForgotModal] = useState(false);
//   const [forgotMobile, setForgotMobile] = useState("");
//   const [forgotOtp, setForgotOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [forgotStageSent, setForgotStageSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);

//   const FORGOT_BASE = "https://api.ekalakaar.com/api/auth/forgot-password";


//    useEffect(() => {
//     const prefillEmail = localStorage.getItem('prefill_email');
//     const prefillPhoneNumber = localStorage.getItem('prefill_phone_number');
//     const prefillCountryCode = localStorage.getItem('prefill_country_code');

//     // If we find an email or phone number in local storage...
//     if (prefillEmail || prefillPhoneNumber) {
//         setFormData(prev => ({
//             ...prev,
//             email: prefillEmail || "",
//             phoneNumber: {
//                 number: prefillPhoneNumber || "",
//                 countryCode: prefillCountryCode || "+91"
//             }
//         }));

//         // IMPORTANT: Clean up the local storage items so they are not used again.
//         localStorage.removeItem('prefill_email');
//         localStorage.removeItem('prefill_phone_number');
//         localStorage.removeItem('prefill_country_code');
//     }
//   }, []); // The empty array ensures this effect runs only once when the page loads.
//   // ✅ ----------------------------------------------------


//   function changeHandler(event) {
//     const { name, value } = event.target;
//     if (name.startsWith("phoneNumber.")) {
//       setFormData((prev) => ({
//         ...prev,
//         phoneNumber: {
//           ...prev.phoneNumber,
//           [name.split(".")[1]]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   }

//   const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

//   // ✅ Send OTP for login
//   const Otp_Send = async (reqBody) => {
//     try {
//       const response = await fetch(endpoints.REGISTER_OTP_SEND, {
//         method: "POST",
//         headers: { "content-Type": "application/json" },
//         body: JSON.stringify(reqBody),
//       });
//       const data = await response.json();
//       if (response.status === 200) {
//         toast.success("OTP has been sent!", { position: "top-center" });
//         setShowOtpModal(true);
//       } else {
//         toast.error(data.message || "Failed to send OTP", {
//           position: "top-center",
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error sending OTP. Please try again.");
//     }
//   };

//   // ✅ Login Submit
//   const submitHandler = async (event) => {
//     event.preventDefault();
//     if (!formData.email && !formData.phoneNumber.number) {
//       return toast.error("Please enter email or phone number");
//     }

//     const reqBody = {
//       email: formData?.email || undefined,
//       mobileNu: formData?.phoneNumber?.number || undefined,
//       registerBy:
//         formData.email && formData.phoneNumber.number
//           ? "both"
//           : formData.email
//           ? "email"
//           : "mobile",
//     };

//     await Otp_Send(reqBody);
//   };

//   // ✅ Verify OTP & Login
//   const handleOtpVerify = async () => {
//     if (!otp || otp.length < 4) {
//       return toast.error("Please enter valid OTP");
//     }

//     const toastId = toast.loading("Verifying OTP...");
//     try {
//       const response = await makeUnauthenticatedPOSTRequest(
//         endpoints.LOGIN_API,
//         {
//           ...formData,
//           otp,
//           registerBy: formData.email ? "email" : "mobile",
//         }
//       );

//       toast.dismiss(toastId);

//         console.log("Backend Response:", response);

//       if (!response || response.error || response.status !== "success") {
//         toast.error(
//           response?.message ||
//             response?.error ||
//             "Invalid OTP. Please check and try again."
//         );
//         return;
//       }
//        console.log("Data from Backend:", response.data);

//       const { accessToken, refreshToken, role } = response.data || {};

//       if (!accessToken || !refreshToken) {
//         toast.error("OTP verification failed. Try again.");
//         return;
//       }

//       if (role !== "Artist") {
//         toast.error("Only Artists can login here");
//         return;
//       }

//       dispatch(setAccessToken(accessToken));
//       dispatch(setRefreshToken(refreshToken));
//       dispatch(setRole(role));

//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//       localStorage.setItem("role", role);

//       toast.success("Login successful!");
//       setShowOtpModal(false);
//       navigate("/Artist_limited_Profile");
//     } catch (error) {
//       toast.dismiss(toastId);
//       console.error("OTP verify error:", error);
//       toast.error("Error verifying OTP. Please try again.");
//     }
//   };

//   // ✅ STEP 1: Forgot Password - Send OTP
//   const handleForgotSendOtp = async () => {
//     if (!forgotMobile) return toast.error("Please enter your mobile number");

//     const toastId = toast.loading("Sending OTP...");
//     try {
//       const res = await fetch(`${FORGOT_BASE}/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           mobileNu: forgotMobile,
//           registerBy: "mobile",
//         }),
//       });
//       const data = await res.json();
//       toast.dismiss(toastId);
//       if (res.status === 200) {
//         toast.success("OTP sent successfully to your mobile!");
//         setForgotStageSent(true);
//       } else {
//         toast.error(data.message || "Failed to send OTP");
//       }
//     } catch (err) {
//       toast.dismiss(toastId);
//       toast.error("Error sending OTP: " + err.message);
//     }
//   };

//   // ✅ STEP 2: Verify OTP (Forgot Password)
//   const handleVerifyForgotOtp = async () => {
//     if (!forgotOtp) return toast.error("Please enter OTP");

//     const toastId = toast.loading("Verifying OTP...");
//     try {
//       const res = await fetch(`${FORGOT_BASE}/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ otp: forgotOtp }),
//         credentials: "include",
//       });

//       const data = await res.json();
//       toast.dismiss(toastId);

//       if (res.status === 200) {
//         toast.success("OTP verified! Now set your new password.");
//         setOtpVerified(true);
//         localStorage.setItem("tempAccessToken", data.data.accessToken);
//       } else {
//         toast.error(data.message || "Invalid OTP");
//       }
//     } catch (err) {
//       toast.dismiss(toastId);
//       toast.error("Error verifying OTP: " + err.message);
//     }
//   };

//   // ✅ STEP 3: Reset Password
//   const handleResetPassword = async () => {
//     if (!newPassword)
//       return toast.error("Please enter your new password");

//     const toastId = toast.loading("Updating password...");
//     try {
//       const res = await fetch(`${FORGOT_BASE}/reset-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("tempAccessToken")}`,
//         },
//         body: JSON.stringify({
//           password: newPassword,
//           passwordConfirm: newPassword,
//         }),
//       });

//       const data = await res.json();
//       toast.dismiss(toastId);

//       if (res.status === 200) {
//         toast.success("Password updated successfully!");
//         localStorage.removeItem("tempAccessToken");
//         setShowForgotModal(false);
//         setForgotStageSent(false);
//         setOtpVerified(false);
//         setForgotOtp("");
//         setNewPassword("");
//         setForgotMobile("");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(data.message || "Failed to reset password");
//       }
//     } catch (err) {
//       toast.dismiss(toastId);
//       toast.error("Error updating password: " + err.message);
//     }
//   };

//   // ---------------------- UI ------------------------
//   return (
//     <>
//       <div className="relative min-h-screen flex flex-col">
//         {/* Background */}
//         <div className="absolute top-0 left-0 w-full h-full z-0">
//           <img
//             src={loginPage}
//             alt="background"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
//         </div>

//         {/* Login Card */}
//         <div className="relative z-10 flex-grow flex justify-center items-center px-4 py-8">
//           <div className="bg-white p-8 rounded-2xl shadow-md w-[400px] max-[440px]:w-full">
//             <div className="mb-4 text-center">
//               <img src={logo} alt="logo" className="h-20 mx-auto" />
//               <h2 className="text-xl font-bold text-[#AD2F3B] mt-2">
//                 Sign in to Artist Portal
//               </h2>
//             </div>

//             <form onSubmit={submitHandler} className="w-full space-y-4">
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={changeHandler}
//                 placeholder="Enter your email"
//                 className="w-full border border-gray-300 p-2 rounded-md"
//               />

//               <div className="flex gap-2">
//                 <select
//                   name="phoneNumber.countryCode"
//                   value={formData.phoneNumber.countryCode || "+91"}
//                   onChange={changeHandler}
//                   className="w-[30%] border px-2 py-2 rounded-md"
//                 >
//                   {Array.from({ length: 250 }, (_, i) => i + 1).map((num) => (
//                     <option key={num} value={`+${num}`}>
//                       +{num}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   name="phoneNumber.number"
//                   value={formData.phoneNumber.number}
//                   onChange={changeHandler}
//                   maxLength={10}
//                   type="number"
//                   placeholder="Phone number"
//                   className="w-full border px-3 py-2 rounded-md"
//                 />
//               </div>

//               <div className="relative w-full">
//                 <input
//                   type={passwordVisible ? "text" : "password"}
//                   name="password"
//                   required
//                   onChange={changeHandler}
//                   value={formData.password}
//                   className="w-full border p-2 rounded-md pr-10"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                 >
//                   <i
//                     className={`fas ${
//                       passwordVisible ? "fa-eye-slash" : "fa-eye"
//                     }`}
//                   ></i>
//                 </button>
//               </div>

//               <p
//                 onClick={() => setShowForgotModal(true)}
//                 className="text-sm text-right text-gray-600 hover:text-[#AD2F3B] cursor-pointer"
//               >
//                 Forgot password?
//               </p>

//               <button
//                 type="submit"
//                 className="w-full bg-[#AD2F3B] text-white font-semibold py-2 rounded-full hover:bg-[#922634] transition"
//               >
//                 Send OTP
//               </button>
//             </form>

//             <p className="text-sm text-gray-600 mt-4 text-center">
//               Don’t have an account?{" "}
//               <span
//                 onClick={() => navigate("/register")}
//                 className="text-[#AD2F3B] cursor-pointer"
//               >
//                 Sign up
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ✅ OTP Modal */}
//       {showOtpModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center">
//             <h3 className="text-xl font-semibold text-[#AD2F3B] mb-4">
//               Enter OTP
//             </h3>
//             <input
//               type="text"
//               maxLength={6}
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full border border-gray-300 p-2 rounded-md mb-4 text-center tracking-widest"
//               placeholder="Enter 6-digit OTP"
//             />
//             <button
//               onClick={handleOtpVerify}
//               className="w-full bg-[#AD2F3B] text-white py-2 rounded-full mb-2 hover:bg-[#922634]"
//             >
//               Verify OTP & Login
//             </button>
//             <button
//               onClick={() => setShowOtpModal(false)}
//               className="text-gray-500 text-sm hover:text-[#AD2F3B]"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ✅ Forgot Password Modal */}
//       {showForgotModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center">
//             {!forgotStageSent ? (
//               <>
//                 <h3 className="text-xl font-semibold text-[#AD2F3B] mb-4">
//                   Forgot Password
//                 </h3>
//                 <input
//                   type="number"
//                   placeholder="Enter your mobile number"
//                   value={forgotMobile}
//                   onChange={(e) => setForgotMobile(e.target.value)}
//                   className="w-full border border-gray-300 p-2 rounded-md mb-4"
//                 />
//                 <button
//                   onClick={handleForgotSendOtp}
//                   className="w-full bg-[#AD2F3B] text-white py-2 rounded-full mb-2 hover:bg-[#922634]"
//                 >
//                   Send OTP
//                 </button>
//                 <button
//                   onClick={() => setShowForgotModal(false)}
//                   className="text-gray-500 text-sm hover:text-[#AD2F3B]"
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : !otpVerified ? (
//               <>
//                 <h3 className="text-xl font-semibold text-[#AD2F3B] mb-4">
//                   Verify OTP
//                 </h3>
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   maxLength={6}
//                   value={forgotOtp}
//                   onChange={(e) => setForgotOtp(e.target.value)}
//                   className="w-full border border-gray-300 p-2 rounded-md mb-3 text-center"
//                 />
//                 <button
//                   onClick={handleVerifyForgotOtp}
//                   className="w-full bg-[#AD2F3B] text-white py-2 rounded-full mb-2 hover:bg-[#922634]"
//                 >
//                   Verify OTP
//                 </button>
//               </>
//             ) : (
//               <>
//                 <h3 className="text-xl font-semibold text-[#AD2F3B] mb-4">
//                   Reset Password
//                 </h3>
//                 <input
//                   type="password"
//                   placeholder="Enter new password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="w-full border border-gray-300 p-2 rounded-md mb-3"
//                 />
//                 <button
//                   onClick={handleResetPassword}
//                   className="w-full bg-[#AD2F3B] text-white py-2 rounded-full mb-2 hover:bg-[#922634]"
//                 >
//                   Update Password
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// }

// export default LoginPage;



import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../services/apis";
import { makeUnauthenticatedPOSTRequest } from "../services/serverHelper";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setRole,
  setRefreshToken,
} from "../reducer/slices/authSlice";


import logo from "../../assets/ek-logo.png";
import loginPage from "../../assets/Untitled design (2).png";
import Footer from "../../components/Footer";


export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // phoneNumber: {
    //   countryCode: "+91",
    //   number: "",
    // },
  });


  // const [otp, setOtp] = useState("");
  // const [showOtpModal, setShowOtpModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);


  // Forgot password states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotMobile, setForgotMobile] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotStageSent, setForgotStageSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);


  const FORGOT_BASE = "https://api.ekalakaar.com/api/v1/auth/forgot-password";



    useEffect(() => {
    const prefillEmail = localStorage.getItem('prefill_email');
    // const prefillPhoneNumber = localStorage.getItem('prefill_phone_number');
    // const prefillCountryCode = localStorage.getItem('prefill_country_code');


    // If we find an email in local storage...
    if (prefillEmail) {
        setFormData(prev => ({
            ...prev,
            email: prefillEmail || "",
            // phoneNumber: {
            //     number: prefillPhoneNumber || "",
            //     countryCode: prefillCountryCode || "+91"
            // }
        }));


        // IMPORTANT: Clean up the local storage items so they are not used again.
        localStorage.removeItem('prefill_email');
        // localStorage.removeItem('prefill_phone_number');
        // localStorage.removeItem('prefill_country_code');
    }
  }, []); 



  function changeHandler(event) {
    const { name, value } = event.target;
    // if (name.startsWith("phoneNumber.")) {
    //   setFormData((prev) => ({
    //     ...prev,
    //     phoneNumber: {
    //       ...prev.phoneNumber,
    //       [name.split(".")[1]]: value,
    //     },
    //   }));
    // } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    // }
  }


  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);


  //  Send OTP for login - COMMENTED OUT
  // const Otp_Send = async (reqBody) => {
  //   try {
  //     const response = await fetch(endpoints.REGISTER_OTP_SEND, {
  //       method: "POST",
  //       headers: { "content-Type": "application/json" },
  //       body: JSON.stringify(reqBody),
  //     });
  //     const data = await response.json();
  //     if (response.status === 200) {
  //       toast.success("OTP has been sent!", { position: "top-center" });
  //       setShowOtpModal(true);
  //     } else {
  //       toast.error(data.message || "Failed to send OTP", {
  //         position: "top-center",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Error sending OTP. Please try again.");
  //   }
  // };


  //  Login Submit Handler - MODIFIED FOR EMAIL/PASSWORD LOGIN
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("Please enter both email and password");
    }

    const toastId = toast.loading("Logging in...");
    try {
      const response = await makeUnauthenticatedPOSTRequest(
        endpoints.LOGIN_API,
        {
          email: formData.email,
          password: formData.password,
          registerBy: "email", // Assuming 'email' is the identifier for this login type
        }
      );

      toast.dismiss(toastId);

      console.log("Backend Response:", response);

      if (!response || response.error || response.status !== "success") {
        toast.error(
          response?.message ||
            response?.error ||
            "Login failed. Please check your credentials and try again."
        );
        return;
      }
      console.log("Data from Backend:", response.data);

      const { accessToken, refreshToken, role } = response.data || {};

      if (!accessToken || !refreshToken) {
        toast.error("Login failed. Try again.");
        return;
      }

      if (role !== "Artist") {
        toast.error("Only Artists can login here");
        return;
      }

      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      dispatch(setRole(role));

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);

      toast.success("Login successful!");
      navigate("/Artist_limited_Profile");
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Login error:", error);
      toast.error("Error logging in. Please try again.");
    }
  };


  //  Verify OTP & Login - COMMENTED OUT
  // const handleOtpVerify = async () => {
  //   if (!otp || otp.length < 4) {
  //     return toast.error("Please enter valid OTP");
  //   }

  //   const toastId = toast.loading("Verifying OTP...");
  //   try {
  //     const response = await makeUnauthenticatedPOSTRequest(
  //       endpoints.LOGIN_API,
  //       {
  //         ...formData,
  //         otp,
  //         registerBy: formData.email ? "email" : "mobile",
  //       }
  //     );

  //     toast.dismiss(toastId);

  //       console.log("Backend Response:", response);

  //     if (!response || response.error || response.status !== "success") {
  //       toast.error(
  //         response?.message ||
  //           response?.error ||
  //           "Invalid OTP. Please check and try again."
  //       );
  //       return;
  //     }
  //       console.log("Data from Backend:", response.data);

  //     const { accessToken, refreshToken, role } = response.data || {};

  //     if (!accessToken || !refreshToken) {
  //       toast.error("OTP verification failed. Try again.");
  //       return;
  //     }

  //     if (role !== "Artist") {
  //       toast.error("Only Artists can login here");
  //       return;
  //     }

  //     dispatch(setAccessToken(accessToken));
  //     dispatch(setRefreshToken(refreshToken));
  //     dispatch(setRole(role));

  //     localStorage.setItem("accessToken", accessToken);
  //     localStorage.setItem("refreshToken", refreshToken);
  //     localStorage.setItem("role", role);

  //     toast.success("Login successful!");
  //     setShowOtpModal(false);
  //     navigate("/Artist_limited_Profile");
  //   } catch (error) {
  //     toast.dismiss(toastId);
  //     console.error("OTP verify error:", error);
  //     toast.error("Error verifying OTP. Please try again.");
  //   }
  // };


  //  STEP 1: Forgot Password - Send OTP
  const handleForgotSendOtp = async () => {
    if (!forgotMobile) return toast.error("Please enter your mobile number");

    const toastId = toast.loading("Sending OTP...");
    try {
      const res = await fetch(`${FORGOT_BASE}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNu: forgotMobile,
          registerBy: "mobile",
        }),
      });
      const data = await res.json();
      toast.dismiss(toastId);
      if (res.status === 200) {
        toast.success("OTP sent successfully to your mobile!");
        setForgotStageSent(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Error sending OTP: " + err.message);
    }
  };


  //  STEP 2: Verify OTP (Forgot Password)
  const handleVerifyForgotOtp = async () => {
    if (!forgotOtp) return toast.error("Please enter OTP");

    const toastId = toast.loading("Verifying OTP...");
    try {
      const res = await fetch(`${FORGOT_BASE}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: forgotOtp }),
        credentials: "include",
      });

      const data = await res.json();
      toast.dismiss(toastId);

      if (res.status === 200) {
        toast.success("OTP verified! Now set your new password.");
        setOtpVerified(true);
        localStorage.setItem("tempAccessToken", data.data.accessToken);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Error verifying OTP: " + err.message);
    }
  };


  //  STEP 3: Reset Password
  const handleResetPassword = async () => {
    if (!newPassword)
      return toast.error("Please enter your new password");

    const toastId = toast.loading("Updating password...");
    try {
      const res = await fetch(`${FORGOT_BASE}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("tempAccessToken")}`,
        },
        body: JSON.stringify({
          password: newPassword,
          passwordConfirm: newPassword,
        }),
      });

      const data = await res.json();
      toast.dismiss(toastId);

      if (res.status === 200) {
        toast.success("Password updated successfully!");
        localStorage.removeItem("tempAccessToken");
        setShowForgotModal(false);
        setForgotStageSent(false);
        setOtpVerified(false);
        setForgotOtp("");
        setNewPassword("");
        setForgotMobile("");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Error updating password: " + err.message);
    }
  };


  // ---------------------- UI ------------------------
  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <img
            src={loginPage}
            alt="background"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        </div>


        {/* Login Card */}
        <div className="relative z-10 flex-grow flex justify-center items-center px-4 py-8">
          <div className="bg-white p-8 rounded-2xl shadow-md w-[400px] max-[440px]:w-full">
            <div className="mb-4 text-center">
              <img src={logo} alt="logo" className="h-20 mx-auto" />
              <h2 className="text-xl font-bold text-[#AD2F3B] mt-2">
                Sign in to Artist Portal
              </h2>
            </div>


            <form onSubmit={submitHandler} className="w-full space-y-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-2 rounded-md"
              />


              {/* Phone Number Input - COMMENTED OUT */}
              {/*
              <div className="flex gap-2">
                <select
                  name="phoneNumber.countryCode"
                  value={formData.phoneNumber.countryCode || "+91"}
                  onChange={changeHandler}
                  className="w-[30%] border px-2 py-2 rounded-md"
                >
                  {Array.from({ length: 250 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={`+${num}`}>
                      +{num}
                    </option>
                  ))}
                </select>
                <input
                  name="phoneNumber.number"
                  value={formData.phoneNumber.number}
                  onChange={changeHandler}
                  maxLength={10}
                  type="number"
                  placeholder="Phone number"
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              */}


              <div className="relative w-full">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  required
                  onChange={changeHandler}
                  value={formData.password}
                  className="w-full border p-2 rounded-md pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <i
                    className={`fas ${
                      passwordVisible ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>


              <p
                onClick={() => setShowForgotModal(true)}
                className="text-sm text-right text-gray-600 hover:text-[#AD2F3B] cursor-pointer"
              >
                Forgot password?
              </p>


              <button
                type="submit"
                className="w-full bg-[#AD2F3B] text-white font-semibold py-2 rounded-full hover:bg-[#922634] transition"
              >
                Sign In
              </button>
            </form>


            <p className="text-sm text-gray-600 mt-4 text-center">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-[#AD2F3B] cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>


      {/* OTP Modal - COMMENTED OUT */}
      {/*
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center">
            <h3 className="text-xl font-semibold text-[#AD2F3B] mb-4">
              Enter OTP
            </h3>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md mb-4 text-center tracking-widest"
              placeholder="Enter 6-digit OTP"
            />
            <button
              onClick={handleOtpVerify}
              className="w-full bg-[#AD2F3B] text-white py-2 rounded-full mb-2 hover:bg-[#922634]"
            >
              Verify OTP & Login
            </button>
            <button
              onClick={() => setShowOtpModal(false)}
              className="text-gray-500 text-sm hover:text-[#AD2F3B]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      */}


      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center">
            {!forgotStageSent ? (
              <>
                <h3 className="text-xl font-semibold text-[#AD2F3B] mb-4">
                  Forgot Password
                </h3>
                <input
                  type="number"
                  placeholder="Enter your mobile number"
                  value={forgotMobile}
                  onChange={(e) => setForgotMobile(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md mb-4"
                />
                <button
                  onClick={handleForgotSendOtp}
                  className="w-full bg-[#AD2F3B] text-white py-2 rounded-full mb-2 hover:bg-[#922634]"
                >
                  Send OTP
                </button>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="text-gray-500 text-sm hover:text-[#AD2F3B]"
                >
                  Cancel
                </button>
              </>
            ) : !otpVerified ? (
              <>
                <h3 className="text-xl font-semibold text-[#AD2F3B] mb-4">
                  Verify OTP
                </h3>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  maxLength={6}
                  value={forgotOtp}
                  onChange={(e) => setForgotOtp(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md mb-3 text-center"
                />
                <button
                  onClick={handleVerifyForgotOtp}
                  className="w-full bg-[#AD2F3B] text-white py-2 rounded-full mb-2 hover:bg-[#922634]"
                >
                  Verify OTP
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-[#AD2F3B] mb-4">
                  Reset Password
                </h3>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md mb-3"
                />
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-[#AD2F3B] text-white py-2 rounded-full mb-2 hover:bg-[#922634]"
                >
                  Update Password
                </button>
              </>
            )}
          </div>
        </div>
      )}


      <Footer />
    </>
  );
}


export default LoginPage;
