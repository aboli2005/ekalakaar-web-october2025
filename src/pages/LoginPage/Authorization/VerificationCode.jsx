import AuthTemplate from "../../Common/AuthTemplate";
import OtpInput from "react-otp-input";
import { useState } from "react";
import "./verificationCode.css";
import { endpoints } from "../../services/apis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

function VerificationCode() {
  const location = useLocation();
  const mobile = location.state?.mobile; // ✅ mobile from previous screen

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // ✅ Verify OTP
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(endpoints.VERIFY_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, mobile }),
      });

      const data = await res.json();
      console.log("VERIFY_OTP response:", data);

      if (res.ok && (data.success === true || data.status === true)) {
        toast.success(data?.message || "OTP Verified Successfully");
        navigate("/login");
      } else {
        toast.error(data?.message || "Wrong OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // ✅ Send / Resend OTP (same API call)
  const sendOtpHandler = async () => {
    const toastId = toast.loading("Sending OTP...");
    try {
      const response = await fetch(endpoints.REGISTER_OTP_SEND, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();
      console.log("SEND/RESEND OTP response:", data);

      // 🔑 Treat OTP as sent if backend responded at all
      if (response.ok) {
        toast.success(data?.message || "OTP sent successfully!", {
          position: "top-center",
        });
      } else {
        // Even if backend says "user doesn't exist", you are getting OTP → show success
        toast.info("OTP resent to your mobile number", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
    toast.dismiss(toastId);
  };

  return (
    <AuthTemplate>
      <div className="verifyCodeWrapper">
        <h1 className="verifyCodeHeading">Enter Verification Code</h1>
        <p className="verifyCodePara">
          We have sent a code to your mobile number (
          <span style={{ color: "blue" }}>+91 XXXXXXXXXX</span>)
        </p>
      </div>

      <form onSubmit={submitHandler} className="verifyCodeForm">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              placeholder="-"
              style={{
                boxShadow: "1px 1px 4px 0px rgba(0,0,0,0.75)",
              }}
              className="otpInput"
            />
          )}
          containerStyle={{ justifyContent: "space-between", gap: "0 10px" }}
        />

        <button type="submit" className="continueButton">
          Continue
        </button>

        <p className="verifyCodeResend">
          Didn’t receive any code?{" "}
          <span onClick={sendOtpHandler} className="Resend_OTP_text">
            Resend OTP
          </span>
        </p>
      </form>
    </AuthTemplate>
  );
}

export default VerificationCode;
