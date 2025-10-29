// import { useNavigate } from "react-router-dom";
// import AuthTemplate from "../../Common/AuthTemplate";
// import "./signup.css";
// import {  useState } from "react";
// import { makeUnauthenticatedPOSTRequest } from "../../services/serverHelper";
// import { toast, ToastContainer } from 'react-toastify';
//   import "react-toastify/dist/ReactToastify.css";
//   import { endpoints } from "../../services/apis";

// const joiningData = [
//   {
//     title: "Patron",
//   },
//   {
//     title: "Artist",
//   },
//   {
//     title: "Partners",
//   },
//   {
//     title: "Art-Lovers",
//   },
// ];


// const numbersArray = Array.from({ length: 250 }, (_, index) => index + 1);

// function Signup() {
//   const navigate = useNavigate();

//   const [checkbox , setCheckbox]  = useState(true);

//   const [formData, setFormData] = useState({
//     role: "Artist",
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     passwordConfirm: "",
//     phoneNumber:{
//          countryCode:"+91",
//         number:""
//    },  });
// console.log(formData.phoneNumber.number.length);
//   function changeHandler(event) {
//         const { name, value } = event.target;
//     if (name.startsWith("phoneNumber.")) {
//       setFormData((prev) => ({
//         ...prev,
//         phoneNumber: {
//           ...prev.phoneNumber,
//           [name.split(".")[1]]: value,
//         },
//       }));
//     }  else{
//     setFormData((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   }
//   }

// const Otp_Send = async (reqBody) => {
//     try {
//      const responce = await fetch(endpoints.REGISTER_OTP_SEND,{
//       method:"POST",
//       headers:{
//         "content-Type":"application/json",
//       },
//       body:JSON.stringify(reqBody)
//     } )
//     if(responce.status === 200){
//       toast.success("Otp has been send... " , {
//             position:"top-center"
//           });
//     }
//     }catch (error) {
//     console.log(error);
//     toast.error(error);
    
//   }

// }


//   const submitHandler = async (event) => {
//     event.preventDefault();
//     if(!checkbox){
//       return toast.error('Agree to the Terms and conditions');
//     }

//     if (formData.password !== formData.passwordConfirm) {
//       return toast.error("password do not match" , {
//         position:"top-center"
//       });
//     }

//       if (formData.phoneNumber.number.length !== 10) {
//         return toast.error("please provide a valid phone number" , {
//           position:"top-center"
//         });
//       }

//     const toastId = toast.loading("Loading...");
//     try {
//       const response = await makeUnauthenticatedPOSTRequest(
//         endpoints.REGISTER_API,
//         formData
//       );

//       if (response.status === "error") {
//         if (response.message?.includes("Please provide a valid email")) {
//           toast.error("Email is not valid " , {
//             position:"top-center"
//           });
//         } else if (
//           response.message?.includes("Provided email address is already in use")
//         ) {
//           toast.error("Email is already registered" , {
//             position:"top-center"
//           });
//         } else if (
//           response.message?.includes(
//             'Duplicate field value: "undefined", Please use another value!'
//           )
//         ) {
//           toast.error("Email is already registered" , {
//             position:"top-center"
//           });
//         } else if (
//           response.message?.includes("Please provide a valid phoneNumber")
//         ) {
//           toast.error("Please provide a valid phoneNumber" , {
//             position:"top-center"
//           });
//         }
//         else{
//           toast.error(response.message , {
//             position:"top-center"
//           });
//         }
//       }
//        else if (response.status === "success") {
//           const reqBody = {};
//           reqBody.email = formData?.email || undefined;
//           reqBody.mobileNu = formData?.phoneNumber?.number || undefined;
          
//           const hasEmail = !!formData?.email;
//           const hasMobile = !!formData?.phoneNumber?.number;
          
//           reqBody.registerBy = hasEmail && hasMobile
//             ? "both"
//             : hasEmail
//             ? "email"
//             : hasMobile
//             ? "mobile"
//             : undefined;          

//           Otp_Send(reqBody)
//         toast.success("Successfully register" , {
//           position:"top-center"
//         });
//         navigate(`/verifyCode/${formData.email}`);
//         }
      
//     } catch (error) {
//       console.log(error);
//     }
//     toast.dismiss(toastId);
//   };

//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <AuthTemplate justifyFlag={true} signupFlag={true}>
//       <div className="signupWrapper">
//         <h1 className="signupHeading">
//           Joining as Artist
//           {/* <select
//             required
//             onChange={changeHandler}
//             value={formData.role}
//             name="role"
//             id=""
//             className="custom-select"
//           >
//             {joiningData.map((data, index) => (
//               <option
//                 onChange={changeHandler}
//                 name="role"
//                 key={index}
//                 className="signupSelectOption"
//                 value={`${data.title}`}
//               >
//                 {data.title}
//               </option>
//             ))}
//           </select> */}
//         </h1>
//         <p className="signupPara">Create Your Account</p>
//       </div>

//       <form onSubmit={submitHandler} className="signupForm">
//         <div className="fullNameWrapper">
//           <label htmlFor="firstName" className="signupFormLabel">
//             <p className="signupFormPara">First Name</p>
//             <input
//               required
//               onChange={changeHandler}
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               className="signupFormInput"
//               placeholder="Enter your first Name"
//               pattern="^[A-Za-z]+$"
//             />
//           </label>
//           <label htmlFor="fullname" className="signupFormLabel">
//             <p className="signupFormPara">Last Name</p>
//             <input
//               required
//               onChange={changeHandler}
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               className="signupFormInput"
//               placeholder="Enter your last Name"
//               pattern="^[A-Za-z]+$"
//             />
//           </label>
//         </div>
//          {/* <label htmlFor=""> */}
//          <label htmlFor="contact" className="signupFormLabel">
//           <p className="signupFormPara" >Contact Number *</p>
          
//                     <div className="phoneNumberWrapper" style={{width:"100%"}}>
                    
                   
//                     <div style={{display:"flex",alignItems:"center",padding:"0px",}}>
//                       <select
//                         onChange={changeHandler}
//                         name="phoneNumber.countryCode"
//                         // value={formData?.phoneNumber?.countryCode}
//                         value={formData?.phoneNumber?.countryCode || "+91"}
//                         style={{
//                           width:"20%",
//                           marginRight: "4px",
//                           paddingRight: "2px",
//                           border:"1px solid #adadad",
//                           height:"40px",
//                           padding:"0px"
//                         }}
//                       >
//                         {numbersArray.map((number) => (
//                           <option
//                             key={number}
//                             value={`+${number}`}
//                           >{`+${number}`}</option>
//                         ))}
//                       </select>
//                       <input
//                         name="phoneNumber.number"
//                         maxLength={10}
//                         type="number"
//                         pattern="[0-9]{10}"
//                         onChange={changeHandler}
//                         value={formData?.phoneNumber?.number}
//                         placeholder="1234567890"
//                         style={{ width: "70%" ,height:"40px" }}
//                         required
//                       />
//                     </div>
//                   </div>
//                   </label>
             

//         <label htmlFor="email" className="signupFormLabel">
//           <p className="signupFormPara">Email</p>
//           <input
//             required
//             onChange={changeHandler}
//             value={formData.email}
//             type="email"
//             name="email"
//             className="signupFormInput "
//             placeholder="Enter your email address"
//           />
//         </label>
//         <label htmlFor="password" className="signupFormLabel">
//           <p className="signupFormPara">Password(minimum 8 characters) </p>
//           <input
//             required
//             onChange={changeHandler}
//             value={formData.password}
//             type={passwordVisible ? 'text' : 'password'}
//             name="password"
//             className="signupFormInput  "
//             minLength={8}
//             placeholder="Enter your password"
//           />
//           <span
//         onClick={togglePasswordVisibility}
//         className={`fa fa-fw field-icon toggle-password ${
//           passwordVisible ? 'fa-eye' : 'fa-eye-slash'
//         }`}
//       ></span>
//         </label>
//         <label htmlFor="confirmPassword" className="signupFormLabel">
//           <p className="signupFormPara">Confirm Password</p>
//           <input
//             required
//             value={formData.passwordConfirm}
//             onChange={changeHandler}
//             type={passwordVisible ? 'text' : 'password'}
//             name="passwordConfirm"
//             className="signupFormInput "
//             placeholder="confirm password"
//           />
//           {/* <span
//         onClick={togglePasswordVisibility}
//         className={`fa fa-fw field-icon toggle-password ${
//           passwordVisible ? 'fa-eye-slash' : 'fa-eye'
//         }`}
//       ></span> */}
//         </label>

       
//         <div className="termAndCondition" style={{display: "flex",flexDirection: "row",justifyContent: "flex-start",marginLeft:"19px"}}>
//         <input type="checkbox" checked={checkbox===true} onChange={()=>setCheckbox((prev)=>!prev)} />
//         <p onClick={()=>navigate("/termAndCondition")} style={{marginTop:"2px" , color:"red" , cursor:"pointer"}}>I Agree to the Terms And Condition</p>
//         </div> 

//         <button type="submit" className="registerButton">
//           Register
//         </button>


//        {/* <div className="termAndCondition">
//         <input type="checkbox" checked={checkbox===true} onChange={()=>setCheckbox((prev)=>!prev)} />
//         <p onClick={()=>navigate("/termAndCondition")} style={{marginTop:"10px" , color:"red" , cursor:"pointer"}}>I Agree to theTerms And Condition</p>
//         </div>        */}
//         <p className=" navigateLoginPara">
//         I have an account{" "}
//           <span onClick={() => navigate("/Login")} className="">
//             Login
//           </span>
//         </p>
//       </form>
//     </AuthTemplate>
//   );
// }

// export default Signup;


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../../services/serverHelper";
import { toast } from "react-toastify";
import { endpoints } from "../../services/apis";
import "react-toastify/dist/ReactToastify.css";

import logo from '../../../assets/ek-logo.png';
import loginPage from '../../../assets/Untitled design (2).png';
import Footer from '../../../components/Footer';


const numbersArray = Array.from({ length: 250 }, (_, index) => index + 1);

function Signup() {
  const navigate = useNavigate();
  const [checkbox, setCheckbox] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    role: "Artist",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: {
      countryCode: "+91",
      number: ""
    }
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    if (name.startsWith("phoneNumber.")) {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: {
          ...prev.phoneNumber,
          [name.split(".")[1]]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const Otp_Send = async (reqBody) => {
    try {
      const response = await fetch(endpoints.REGISTER_OTP_SEND, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(reqBody)
      });
      if (response.status === 200) {
        toast.success("Otp has been sent...", { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!checkbox) return toast.error("Agree to the Terms and Conditions");
    if (formData.password !== formData.passwordConfirm)
      return toast.error("Passwords do not match", { position: "top-center" });
    if (formData.phoneNumber.number.length !== 10)
      return toast.error("Please provide a valid phone number", {
        position: "top-center"
      });

    const toastId = toast.loading("Loading...");
    try {
      const response = await makeUnauthenticatedPOSTRequest(
        endpoints.REGISTER_API,
        formData
      );

      if (response.status === "error") {
        const msg = response.message;
        if (msg?.includes("valid email")) toast.error("Email is not valid");
        else if (msg?.includes("already in use"))
          toast.error("Email is already registered");
        else if (msg?.includes("valid phoneNumber"))
          toast.error("Please provide a valid phone number");
        else toast.error(msg);
      } else if (response.status === "success") {
        const reqBody = {
          email: formData.email,
          mobileNu: formData.phoneNumber.number,
          registerBy:
            formData.email && formData.phoneNumber.number
              ? "both"
              : formData.email
              ? "email"
              : "mobile"
        };
        Otp_Send(reqBody);
        toast.success("Successfully registered", { position: "top-center" });
        navigate(`/verifyCode/${formData.email}`);
      }
    } catch (error) {
      console.log(error);
    }
    toast.dismiss(toastId);
  };

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

        {/* Main form card */}
        <div className="relative z-10 flex-grow flex justify-center items-center px-4 py-8">
          <div className="bg-white p-8 rounded-2xl shadow-md w-[450px] max-w-full max-[440px]:h-full">
            <div className="mb-4 text-center">
              <img src={logo} alt="logo" className="h-14 mx-auto" />
              <h2 className="text-xl font-bold text-[#AD2F3B] mt-2">
                Sign up as Artist
              </h2>
              <p className="text-gray-600 text-sm">Create your account</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-4">
              {/* First Name & Last Name */}
              <div className="flex gap-3">
                <input
                  required
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={changeHandler}
                  className="w-1/2 border px-3 py-2 rounded-md"
                />
                <input
                  required
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={changeHandler}
                  className="w-1/2 border px-3 py-2 rounded-md"
                />
              </div>

              {/* Contact */}
              <div className="flex gap-2">
                <select
                  name="phoneNumber.countryCode"
                  value={formData.phoneNumber.countryCode || "+91"}
                  onChange={changeHandler}
                  className="w-[30%] border px-2 py-2 rounded-md"
                >
                  {numbersArray.map((number) => (
                    <option key={number} value={`+${number}`}>
                      +{number}
                    </option>
                  ))}
                </select>
                <input
                  required
                  name="phoneNumber.number"
                  type="number"
                  pattern="[0-9]{10}"
                  placeholder="Phone Number"
                  maxLength={10}
                  value={formData.phoneNumber.number}
                  onChange={changeHandler}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              {/* Email */}
              <input
                required
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={changeHandler}
                className="w-full border px-3 py-2 rounded-md"
              />

              {/* Password */}
              <div className="relative">
                <input
                  required
                  name="password"
                  placeholder="Password"
                  minLength={8}
                  type={passwordVisible ? "text" : "password"}
                  value={formData.password}
                  onChange={changeHandler}
                  className="w-full border px-3 py-2 rounded-md pr-10"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  <i
                    className={`fas ${
                      passwordVisible ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>

              {/* Confirm Password */}
              <input
                required
                name="passwordConfirm"
                type={passwordVisible ? "text" : "password"}
                value={formData.passwordConfirm}
                onChange={changeHandler}
                placeholder="Confirm Password"
                className="w-full border px-3 py-2 rounded-md"
              />

              {/* Terms & conditions */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checkbox}
                  onChange={() => setCheckbox((prev) => !prev)}
                />
                <p
                  onClick={() => navigate("/termAndCondition")}
                  className="text-sm text-red-600 cursor-pointer"
                >
                  I Agree to the Terms and Conditions
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#AD2F3B] text-white font-semibold py-2 rounded-full hover:bg-[#922634] transition"
              >
                Register
              </button>

              <p className="text-sm text-center mt-2 text-gray-600">
                Already have an account?{" "}
                <span
                  className="text-[#AD2F3B] cursor-pointer"
                  onClick={() => navigate("/Login")}
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
