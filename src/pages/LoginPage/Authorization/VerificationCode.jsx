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
  // inside VerificationCode component (replace existing submitHandler)
const submitHandler = async (event) => {
  event.preventDefault();

  // quick validation
  const trimmedOtp = (otp || "").toString().trim();
  if (!mobile) {
    toast.error("Mobile number missing. Please go back and re-enter.");
    console.error("Missing mobile in location.state:", location.state);
    return;
  }
  if (trimmedOtp.length < 4) {
    toast.error("Please enter the complete OTP.");
    return;
  }

  try {
    console.log("Sending VERIFY_OTP request -> payload:", { mobile, otp: trimmedOtp });

    const res = await fetch(endpoints.VERIFY_OTP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp: trimmedOtp }), // change "otp" key if backend expects a different field
    });

    // raw text and parsed json (for debug if JSON parse fails)
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      // fallback - sometimes API returns JSON-like but not strict JSON
      console.warn("Response was not valid JSON, raw text:", text);
      data = { raw: text };
    }

    console.log("VERIFY_OTP raw response status:", res.status, "ok:", res.ok);
    console.log("VERIFY_OTP parsed response:", data);

    // Flexible success detection:
    const isSuccess =
      res.ok ||
      data?.status === "success" ||
      data?.statusCode === 200 ||
      data?.success === true ||
      Boolean(data?.accessToken) ||
      Boolean(data?.data?.accessToken);

    if (isSuccess) {
      toast.success(data?.message || "OTP Verified Successfully");

      // store tokens if present (check both places)
      const accessToken = data?.accessToken || data?.data?.accessToken;
      const refreshToken = data?.refreshToken || data?.data?.refreshToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      // navigate to dashboard or login as needed
      navigate("/login");
    } else {
      // server might return message explaining why OTP is wrong
      const errMsg = data?.message || data?.error || "Wrong OTP";
      toast.error(errMsg);
      console.error("OTP verification failed:", data);
    }
  } catch (error) {
    console.error("VERIFY_OTP error:", error);
    toast.error("Something went wrong while verifying OTP.");
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
