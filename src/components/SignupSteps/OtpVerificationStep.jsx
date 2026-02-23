import React from 'react'
import { useRef, useState } from "react"
import api from '../../utils/api'
import Loader from '../common/LoadingSpinner'

const OtpVerificationStep = ({userData,updateUserData,nextStep}) => {

  const [loading,setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""))
  const inputRefs = useRef([])

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    const otpString = newOtp.join("");
    
    //Store inside userData
    updateUserData({otp:otpString});
    console.log(userData)
    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleVerify = async ()=>{
    console.log(userData)
    if (!userData.otp || userData.otp.length !== 6){
      alert("Please enter complete OTP");
      return;
    }

    setLoading(true);
    try{
      const res = await api.post("/otpVerify",{email:userData.email,otp:userData.otp});
      console.log(res)
      console.log(userData)
      if(!res.data.success){
        alert("res.data.message")
        return;
      }
      nextStep()
    }catch(error){
      alert(error.response.data.message);
      console.log("erro",error.response.data.message);
    }finally{
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4" >
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-center mb-2">
        Verify OTP
      </h2>

      <p className="text-center text-gray-500 text-sm mb-6">
        Enter the 6-digit code sent to your email
      </p>

      <div className="flex justify-between gap-2 sm:gap-3 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <button onClick={handleVerify} className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium">
        {loading ? <Loader /> : "Verify Code"}
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Didn't receive code?{" "}
        <span className="text-blue-600 cursor-pointer hover:underline">
          Resend
        </span>
      </p>
    </div>
    </div>
  )
}

export default OtpVerificationStep;
